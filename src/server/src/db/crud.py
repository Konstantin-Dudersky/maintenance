from sqlalchemy import select
from sqlalchemy.orm import Session
from . import models, schemas


def read_objects(
    db: Session,
) -> list[models.Equip]:
    """Возвращает все оборудование."""
    stmt = select(models.Equip)
    return db.execute(stmt).scalars().all()


def create_equip(
    db: Session,
    equip: schemas.Equip,
) -> models.Equip:
    new_equip = models.Equip(
        name=equip.name,
        description=equip.description,
        tech_params=equip.tech_params,
    )
    db.add(new_equip)
    db.commit()
    return new_equip


def read_object_by_id(
    db: Session,
    id: int,
) -> models.Equip:
    """Возвращает оборудование по id."""
    stmt = select(models.Equip).where(models.Equip.id == id)
    return db.execute(stmt).scalars().first()


def update_equip_by_id(
    db: Session,
    existing_equip: models.Equip,
    updated_equip: schemas.Equip,
) -> models.Equip:
    updated_data = updated_equip.dict(exclude_unset=True)
    for key, value in updated_data.items():
        setattr(existing_equip, key, value)
    db.commit()
    return read_object_by_id(db, updated_equip.id)


def delete_equip_by_id(
    db: Session,
    id: int,
) -> None:
    delete_equip = read_object_by_id(db, id)
    db.delete(delete_equip)
    db.commit()


def read_equip_stat_events(
    db: Session,
    id: int,
) -> list[models.Event] | None:
    stmt = select(models.Equip).where(models.Equip.id == id)
    equip = db.execute(stmt).scalars().first()
    if equip is None:
        return None
    stmt = select(models.Event).where(models.Event.equip == equip)
    return db.execute(stmt).scalars().all()
