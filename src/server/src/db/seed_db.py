"""Создает в БД начальные данные."""

from sqlalchemy.orm import Session

from src.db.crud import create_event_status, create_event_type
from src.db.models import EventStatuses, EventTypes


def seed_db(db: Session) -> None:
    """Создает в БД начальные данные."""
    # event_type
    create_event_type(
        name=EventTypes.PLANNED_CYCLIC,
        description="",
        db=db,
    )
    create_event_type(
        name=EventTypes.PLANNED_SINGLE,
        description="",
        db=db,
    )
    create_event_type(
        name=EventTypes.UNPLANNED,
        description="",
        db=db,
    )
    # event_status
    create_event_status(
        db=db,
        name=EventStatuses.PLANNED,
        description="",
    )
    create_event_status(
        db=db,
        name=EventStatuses.INWORK,
        description="",
    )
    create_event_status(
        db=db,
        name=EventStatuses.DONE,
        description="",
    )
