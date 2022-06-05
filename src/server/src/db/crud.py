"""Операции с БД."""

from sqlalchemy import select
from sqlalchemy.orm import Session

from src.db import models, schemas


def read_equips(
    db: Session,
) -> list[models.Equip]:
    """Возвращает все оборудование."""
    stmt = select(models.Equip)
    return db.execute(stmt).scalars().all()


def create_equip(
    db: Session,
    equip: schemas.Equip,
) -> models.Equip:
    """Создает новое оборудование."""
    new_equip = models.Equip(
        name=equip.name,
        description=equip.description,
        tech_params=equip.tech_params,
    )
    db.add(new_equip)
    db.commit()
    return new_equip


def read_equip_by_id(
    db: Session,
    equip_id: int,
) -> models.Equip:
    """Возвращает оборудование по id."""
    stmt = select(models.Equip).where(models.Equip.equip_id == equip_id)
    return db.execute(stmt).scalars().first()


def update_equip_by_id(
    db: Session,
    existing_equip: models.Equip,
    updated_equip: schemas.Equip,
) -> models.Equip:
    """Обновляет оборудование."""
    updated_data = updated_equip.dict(exclude_unset=True)
    for key, value in updated_data.items():
        setattr(existing_equip, key, value)
    db.commit()
    return read_equip_by_id(db, updated_equip.id)


def delete_equip_by_id(
    db: Session,
    equip_id: int,
) -> None:
    """Удаляет оборудование по event_id."""
    delete_equip = read_equip_by_id(db, equip_id)
    db.delete(delete_equip)
    db.commit()


def read_event_by_id(
    db: Session,
    equip_id: int,
) -> list[models.Event] | None:
    """Возвращает журнал по equip_id."""
    stmt = select(models.Event).where(models.Event.equip_id == equip_id)
    return db.execute(stmt).scalars().all()


# ------------------------------------------------------------------------------
# EventType


def create_event_type(
    name: str,
    description: str,
    db: Session,
) -> models.EventType:
    """Создает новый тип события."""
    event_type = models.EventType(
        name=name,
        description=description,
    )
    db.add(event_type)
    db.commit()


def read_event_types(
    db: Session,
) -> list[models.EventType]:
    """Возвращает перечень всех типов событий."""
    stmt = select(models.EventType)
    return db.execute(stmt).scalars.all()
