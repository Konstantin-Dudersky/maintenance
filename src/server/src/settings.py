"""Файл для настроек.

Для чтения настроек импортировать:
from src.settings import settings

Для создания файла с дефолтными настройками запустить функцию create_env():
poetry run poe create_env
"""

from typing import TYPE_CHECKING

from dotenv import set_key

from pydantic import BaseSettings

if TYPE_CHECKING:
    PostgresDsn = str
else:
    from pydantic import PostgresDsn

ENV_FILE = ".env"


class Settings(BaseSettings):
    """Модель для сохранения настроек."""

    pg_dsn: PostgresDsn = (
        """postgresql://postgres:postgres@localhost:5432/maintenance"""
    )
    debug: bool = False

    class Config:
        """Настройки."""

        env_file = ENV_FILE
        env_file_encoding = "utf-8"


def create_env() -> None:
    """Записывает файл с дефолтными значениями."""
    # создает файл или очищает, если уже был
    with open(".env", "w") as f:
        f.write("")
    for key, value in Settings().dict().items():
        set_key(
            dotenv_path=ENV_FILE,
            key_to_set=key,
            value_to_set=value,
            quote_mode="never",
            export=False,
            encoding="utf-8",
        )


settings = Settings()

if __name__ == "__main__":
    pass
