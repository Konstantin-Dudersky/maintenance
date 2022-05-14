"""Models for save data in PostgreSQL database."""

from sqlalchemy import Column, Integer, String
from .database import Base


class Object(Base):
    """Таблица для представления объекта."""

    __tablename__ = "object"

    # fields
    id = Column(Integer, primary_key=True)
    name = Column(String)
    description = Column(String)
    tech_params = Column(String)
