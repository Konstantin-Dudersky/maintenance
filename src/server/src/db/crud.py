from sqlalchemy import select
from sqlalchemy.orm import Session
from . import models


def read_objects(
    db: Session,
) -> list[models.Object]:
    """Read Channel database."""
    stmt = select(models.Object)

    return db.execute(stmt).scalars().all()
