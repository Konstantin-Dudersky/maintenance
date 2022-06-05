"""Создает в БД начальные данные."""

from sqlalchemy.orm import Session

from .crud import create_event_type


def seed_db(db: Session) -> None:
    """Создает в БД начальные данные."""
    create_event_type(
        name="Обслуживание",
        description="",
        db=db,
    )
    create_event_type(
        name="Авария",
        description="",
        db=db,
    )
