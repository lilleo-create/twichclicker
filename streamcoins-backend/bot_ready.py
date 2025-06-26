import asyncio
import json
from aiogram import Bot, Dispatcher, types
from aiogram.filters import CommandStart
from aiogram.types import WebAppInfo, InlineKeyboardMarkup, InlineKeyboardButton
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime
import os

BOT_TOKEN = os.getenv("BOT_TOKEN", "8171808111:AAGso_hRbYNufz9mclqSY7RmSy3Mz1oaeuE")
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
WEB_APP_URL = os.getenv("WEB_APP_URL", "https://streamcoins.ru")

bot = Bot(token=BOT_TOKEN)
dp = Dispatcher()

mongo_client = AsyncIOMotorClient(MONGO_URI)
db = mongo_client["streamcoins"]
users = db["users"]


async def register_user(message: types.Message):
    data = {
        "telegram_id": message.from_user.id,
        "username": message.from_user.username,
        "first_name": message.from_user.first_name,
        "last_name": message.from_user.last_name,
        "last_activity": datetime.utcnow(),
        "balance": 0,
        "total_clicks": 0,
        "click_power": 1,
        "level": 1,
        "experience": 0
    }

    await users.update_one(
        {"telegram_id": message.from_user.id},
        {"$setOnInsert": data, "$set": {"last_activity": datetime.utcnow()}},
        upsert=True
    )


async def add_click(telegram_id: int, clicks: int = 1):
    user = await users.find_one({"telegram_id": telegram_id})
    if not user:
        return 0

    power = user.get("click_power", 1)
    earned = clicks * power

    await users.update_one(
        {"telegram_id": telegram_id},
        {
            "$inc": {
                "balance": earned,
                "total_clicks": clicks,
                "experience": clicks
            }
        }
    )
    return earned


@dp.message(CommandStart())
async def cmd_start(message: types.Message):
    await register_user(message)
    user = await users.find_one({"telegram_id": message.from_user.id})

    keyboard = InlineKeyboardMarkup(inline_keyboard=[
        [InlineKeyboardButton(text="🚀 Открыть игру", web_app=WebAppInfo(url=WEB_APP_URL))],
        [InlineKeyboardButton(text="📊 Статистика", callback_data="stats")]
    ])

    await message.answer(
        f"Привет, {message.from_user.first_name}! 🎮\n"
        f"💰 Баланс: {user['balance']}\n"
        f"⚡️ Сила клика: {user['click_power']}\n"
        f"🏆 Уровень: {user['level']}",
        reply_markup=keyboard
    )


@dp.callback_query(lambda c: c.data == 'stats')
async def show_stats(callback_query: types.CallbackQuery):
    user = await users.find_one({"telegram_id": callback_query.from_user.id})

    await callback_query.message.edit_text(
        f"📊 Ваша статистика:\n\n"
        f"🔢 Всего кликов: {user['total_clicks']}\n"
        f"💰 Баланс: {user['balance']}\n"
        f"⚡️ Сила клика: {user['click_power']}\n"
        f"🏆 Уровень: {user['level']}\n"
        f"📈 Опыт: {user['experience']}/{user['level'] * 100}",
        reply_markup=InlineKeyboardMarkup(inline_keyboard=[
            [InlineKeyboardButton(text="Назад", callback_data="back_to_main")]
        ])
    )
    await callback_query.answer()


@dp.callback_query(lambda c: c.data == 'back_to_main')
async def back_to_main(callback_query: types.CallbackQuery):
    user = await users.find_one({"telegram_id": callback_query.from_user.id})

    await callback_query.message.edit_text(
        f"Главное меню\n\n"
        f"💰 Баланс: {user['balance']}\n"
        f"⚡️ Сила клика: {user['click_power']}\n"
        f"🏆 Уровень: {user['level']}",
        reply_markup=InlineKeyboardMarkup(inline_keyboard=[
            [InlineKeyboardButton(text="🚀 Открыть игру", web_app=WebAppInfo(url=WEB_APP_URL))],
            [InlineKeyboardButton(text="📊 Статистика", callback_data="stats")]
        ])
    )
    await callback_query.answer()


@dp.message(lambda message: message.web_app_data)
async def handle_web_app_data(message: types.Message):
    data = json.loads(message.web_app_data.data)
    await register_user(message)

    if 'clicks' in data:
        earned = await add_click(message.from_user.id, data['clicks'])
        await message.answer(f"Вы получили {earned} монет за клики!")


async def main():
    print("⏳ Запуск StreamCoins Bot...")
    await dp.start_polling(bot)


if __name__ == '__main__':
    asyncio.run(main())
