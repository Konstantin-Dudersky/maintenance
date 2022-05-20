from sqlalchemy import select
from sqlalchemy.orm import Session
from . import models, schemas


def read_objects(
    db: Session,
) -> list[models.Object]:
    """Возвращает все оборудование."""
    stmt = select(models.Object)
    return db.execute(stmt).scalars().all()


def create_equip(
    db: Session,
    equip: schemas.Object,
) -> models.Object:
    new_equip = models.Object(
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
) -> models.Object:
    """Возвращает оборудование по id."""
    stmt = select(models.Object).where(models.Object.id == id)
    return db.execute(stmt).scalars().first()


def update_equip_by_id(
    db: Session,
    existing_equip: models.Object,
    updated_equip: schemas.Object,
) -> models.Object:
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
