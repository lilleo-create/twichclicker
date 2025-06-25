import asyncio
import sqlite3
import json
from pathlib import Path
from aiogram import Bot, Dispatcher, types
from aiogram.filters import CommandStart
from aiogram.types import WebAppInfo, InlineKeyboardMarkup, InlineKeyboardButton

BOT_TOKEN = '8171808111:AAGso_hRbYNufz9mclqSY7RmSy3Mz1oaeuE'
WEB_APP_URL = 'https://preeminent-biscotti-993d1b.netlify.app/'  # Замени на свою ссылку

bot = Bot(token=BOT_TOKEN)
dp = Dispatcher()

DB_PATH = Path('twitch_clicker.db')


def init_db():
    with sqlite3.connect(DB_PATH) as conn:
        cursor = conn.cursor()
        cursor.executescript('''
        CREATE TABLE IF NOT EXISTS users (
            user_id INTEGER PRIMARY KEY,
            telegram_id INTEGER UNIQUE NOT NULL,
            username TEXT,
            first_name TEXT,
            last_name TEXT,
            registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            is_premium BOOLEAN DEFAULT FALSE,
            language_code TEXT DEFAULT 'ru',
            balance INTEGER DEFAULT 0,
            total_clicks INTEGER DEFAULT 0
        );

        CREATE TABLE IF NOT EXISTS user_progress (
            progress_id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER REFERENCES users(user_id),
            level INTEGER DEFAULT 1,
            experience INTEGER DEFAULT 0,
            click_power INTEGER DEFAULT 1,
            upgrades_purchased TEXT DEFAULT '{}',
            last_daily_bonus TIMESTAMP,
            streak_days INTEGER DEFAULT 0,
            achievements_unlocked TEXT DEFAULT '[]'
        );

        CREATE TABLE IF NOT EXISTS transactions (
            transaction_id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER REFERENCES users(user_id),
            amount INTEGER NOT NULL,
            transaction_type TEXT NOT NULL,
            description TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS upgrades (
            upgrade_id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT NOT NULL,
            base_price INTEGER NOT NULL,
            power_increase INTEGER NOT NULL,
            max_level INTEGER DEFAULT 100,
            icon TEXT
        );

        CREATE TABLE IF NOT EXISTS achievements (
            achievement_id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT NOT NULL,
            condition_type TEXT NOT NULL,
            condition_value INTEGER NOT NULL,
            reward INTEGER DEFAULT 0,
            icon TEXT
        );
        ''')

        # Базовые улучшения
        cursor.executemany('''
        INSERT OR IGNORE INTO upgrades (name, description, base_price, power_increase, icon)
        VALUES (?, ?, ?, ?, ?)
        ''', [
            ('Улучшенный клик', 'Увеличивает силу каждого клика', 50, 1, '🖱'),
            ('Автокликер', 'Автоматически кликает раз в секунду', 200, 1, '⏱️'),
            ('Мощный стрим', 'Увеличивает доход от зрителей', 500, 5, '💪'),
            ('Золотая кнопка', 'Шанс получить больше денег за клик', 1000, 10, '💰')
        ])

        conn.commit()


def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def register_user(message: types.Message):
    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute('''
        INSERT INTO users (telegram_id, username, first_name, last_name)
        VALUES (?, ?, ?, ?)
        ON CONFLICT(telegram_id) DO UPDATE SET
            username = excluded.username,
            first_name = excluded.first_name,
            last_name = excluded.last_name,
            last_activity = CURRENT_TIMESTAMP
        RETURNING user_id
        ''', (message.from_user.id, message.from_user.username,
              message.from_user.first_name, message.from_user.last_name))

        user_id = cursor.fetchone()[0]
        cursor.execute('''
        INSERT OR IGNORE INTO user_progress (user_id)
        VALUES (?)
        ''', (user_id,))
        conn.commit()
        return user_id


def get_user(telegram_id: int):
    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute('''
        SELECT u.*, up.*
        FROM users u
        LEFT JOIN user_progress up ON u.user_id = up.user_id
        WHERE u.telegram_id = ?
        ''', (telegram_id,))
        return cursor.fetchone()


def add_click(user_id: int, clicks: int = 1):
    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute('SELECT click_power FROM user_progress WHERE user_id = ?', (user_id,))
        click_power = cursor.fetchone()[0]
        earned = clicks * click_power

        cursor.execute('''
        UPDATE users SET balance = balance + ?, total_clicks = total_clicks + ?
        WHERE user_id = ?
        ''', (earned, clicks, user_id))

        cursor.execute('''
        INSERT INTO transactions (user_id, amount, transaction_type, description)
        VALUES (?, ?, 'click', ?)
        ''', (user_id, earned, f'Клики: {clicks}'))

        cursor.execute('''
        UPDATE user_progress SET experience = experience + ?
        WHERE user_id = ?
        ''', (clicks, user_id))

        conn.commit()
        return earned


@dp.message(CommandStart())
async def cmd_start(message: types.Message):
    user_id = register_user(message)
    user = get_user(message.from_user.id)

    keyboard = InlineKeyboardMarkup(inline_keyboard=[
        [InlineKeyboardButton(text="🚀 Открыть игру", web_app=WebAppInfo(url=WEB_APP_URL))],
        [InlineKeyboardButton(text="📊 Статистика", callback_data="stats")],
        [InlineKeyboardButton(text="💪 Улучшения", callback_data="upgrades")]
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
    user = get_user(callback_query.from_user.id)

    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute('SELECT COUNT(*) FROM transactions WHERE user_id = ?', (user['user_id'],))
        transactions_count = cursor.fetchone()[0]

        cursor.execute('''
        SELECT SUM(amount) FROM transactions 
        WHERE user_id = ? AND transaction_type = "click"
        ''', (user['user_id'],))
        total_earned = cursor.fetchone()[0] or 0

    await callback_query.message.edit_text(
        f"📊 Ваша статистика:\n\n"
        f"🔢 Всего кликов: {user['total_clicks']}\n"
        f"💰 Баланс: {user['balance']}\n"
        f"💵 Всего заработано: {total_earned}\n"
        f"⚡️ Сила клика: {user['click_power']}\n"
        f"🏆 Уровень: {user['level']}\n"
        f"📈 Опыт: {user['experience']}/{user['level'] * 100}\n"
        f"🔥 Серия дней: {user['streak_days']}",
        reply_markup=InlineKeyboardMarkup(inline_keyboard=[
            [InlineKeyboardButton(text="Назад", callback_data="back_to_main")]
        ])
    )
    await callback_query.answer()


@dp.callback_query(lambda c: c.data == 'upgrades')
async def show_upgrades(callback_query: types.CallbackQuery):
    user = get_user(callback_query.from_user.id)

    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM upgrades')
        upgrades = cursor.fetchall()

    upgrades_text = ""
    for upgrade in upgrades:
        purchased = json.loads(user['upgrades_purchased'])
        level = purchased.get(str(upgrade['upgrade_id']), 0)
        price = upgrade['base_price'] * (level + 1)

        upgrades_text += (
            f"{upgrade['icon']} {upgrade['name']} (Ур. {level})\n"
            f"{upgrade['description']}\n"
            f"💸 След. уровень: {price} | +{upgrade['power_increase']} силы\n"
            f"─────────────────────\n"
        )

    await callback_query.message.edit_text(
        f"💪 Доступные улучшения:\n\n{upgrades_text}",
        reply_markup=InlineKeyboardMarkup(inline_keyboard=[
            [InlineKeyboardButton(text="Назад", callback_data="back_to_main")]
        ])
    )
    await callback_query.answer()


@dp.callback_query(lambda c: c.data == 'back_to_main')
async def back_to_main(callback_query: types.CallbackQuery):
    user = get_user(callback_query.from_user.id)

    await callback_query.message.edit_text(
        f"Главное меню\n\n"
        f"💰 Баланс: {user['balance']}\n"
        f"⚡️ Сила клика: {user['click_power']}\n"
        f"🏆 Уровень: {user['level']}",
        reply_markup=InlineKeyboardMarkup(inline_keyboard=[
            [InlineKeyboardButton(text="🚀 Открыть игру", web_app=WebAppInfo(url=WEB_APP_URL))],
            [InlineKeyboardButton(text="📊 Статистика", callback_data="stats")],
            [InlineKeyboardButton(text="💪 Улучшения", callback_data="upgrades")]
        ])
    )
    await callback_query.answer()


@dp.message(lambda message: message.web_app_data)
async def handle_web_app_data(message: types.Message):
    data = json.loads(message.web_app_data.data)
    user_id = register_user(message)

    if 'clicks' in data:
        earned = add_click(user_id, data['clicks'])
        await message.answer(f"Вы получили {earned} монет за клики!")

# Запуск
async def main():
    init_db()
    await dp.start_polling(bot)

if __name__ == '__main__':
    asyncio.run(main())