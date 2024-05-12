from aiogram import Bot, Dispatcher, types
from aiogram import F
from config import token
import asyncio
from aiogram.filters.command import Command


async def testdefapp(message: types.Message):
    btn = types.ReplyKeyboardMarkup(keyboard=[
        [  
            types.KeyboardButton(text="Тест", web_app=types.WebAppInfo(url="https://bumbbleBoY.github.io"))
        ]
    ])
    
    await message.answer("Тест", reply_markup=btn)