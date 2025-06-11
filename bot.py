from aiogram import Bot, Dispatcher, types
from aiogram.filters import CommandStart
from aiogram.types import WebAppInfo, InlineKeyboardMarkup, InlineKeyboardButton
import asyncio

BOT_TOKEN = '8171808111:AAGso_hRbYNufz9mclqSY7RmSy3Mz1oaeuE'  # ВСТАВЬ свой TOKEN

WEB_APP_URL = 'https://preeminent-biscotti-993d1b.netlify.app/'# пока можешь заглушку поставить

bot = Bot(token=BOT_TOKEN)
dp = Dispatcher()

@dp.message(CommandStart())
async def cmd_start(message: types.Message):
    keyboard = InlineKeyboardMarkup(inline_keyboard=[
        [InlineKeyboardButton(text="🚀 Открыть игру", web_app=WebAppInfo(url=WEB_APP_URL))]
    ])
    await message.answer("Привет! Готов прокачать стрим? 🎮", reply_markup=keyboard)

async def main():
    await dp.start_polling(bot)

if __name__ == '__main__':
    asyncio.run(main())
