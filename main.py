from aiogram import Bot, Dispatcher, types
from aiogram import F
from config import token
import asyncio
from aiogram.filters.command import Command
from miniapptest import testdefapp
from aiogram.utils.web_app import safe_parse_webapp_init_data
from aiohttp.web_request import Request
from aiohttp.web_response import json_response

from typing import Union, Dict, Any
from aiogram.filters import Filter
from aiogram.types import Message

class WebAppDataFilter(Filter):
    async def __call__(self, message: Message, **kwargs) -> Union[bool, Dict[str, Any]]:
        return dict(web_app_data=message.web_app_data) if message.web_app_data else False

#... Инициализация бота


async def handle_web_app_data(message: types.Message, web_app_data: types.WebAppData):
    print(web_app_data)
    await message.answer("Received web app data")


async def check_data_handler(request: Request):
    bot: Bot = request.app["bot"]

    data = await request.post()  # application/x-www-form-urlencoded
    try:
        data = safe_parse_webapp_init_data(token=token, init_data=data["_auth"])
        print(data)
    except ValueError:
        return json_response({"ok": False, "err": "Unauthorized"}, status=401)
    return json_response({"ok": True, "data": data.user.dict()})

async def check(message: types.Message):
    print(1)
    await message.answer(message.web_app_data.data)
async def main():
    bot = Bot(token=token, parse_mode='HTML')
    dp = Dispatcher()

    dp.message.register(handle_web_app_data, WebAppDataFilter())
    dp.message.register(check, F.web_app_data)
    dp.message.register(testdefapp, Command('start'))
    
    
    await bot.delete_webhook(drop_pending_updates=True)
    
    await dp.start_polling(bot)
    

if __name__ == "__main__":
    asyncio.run(main())