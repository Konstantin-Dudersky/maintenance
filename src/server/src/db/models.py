"""Models for save data in PostgreSQL database."""

from datetime import datetime

from sqlalchemy import Column, DateTime, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from .database import Base


class Equip(Base):
    """Таблица для представления объекта."""

    __tablename__ = "equip"
    # PK
    equip_id: int = Column(Integer, primary_key=True)
    # FK
    events: list["Event"] = relationship("Event", back_populates="equip")
    # fields
    name: str = Column(String)
    description: str = Column(String)
    tech_params: str = Column(String)


class EventType(Base):
    """Таблица для типов событий в журнале оператора."""

    __tablename__ = "event_type"
    # PK
    event_type_id: int = Column(Integer, primary_key=True)
    # FK
    events: list["Event"] = relationship("Event", back_populates="event_type")
    # fields
    name: str = Column(String)
    description: str = Column(String)
    color: str = Column(String)


class Event(Base):
    """Таблица для журнала оператора."""

    __tablename__ = "event"
    # PK
    event_id: int = Column(Integer, primary_key=True)
    # FK
    event_type_id: int = Column(
        Integer,
        ForeignKey("event_type.event_type_id"),
    )
    event_type: "Event" = relationship("EventType", back_populates="events")
    equip_id: int = Column(Integer, ForeignKey("equip.equip_id"))
    equip: "Equip" = relationship("Equip", back_populates="events")
    # fields
    ts: datetime = Column(DateTime)
    description: str = Column(String)
