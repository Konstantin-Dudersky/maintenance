"""Models for save data in PostgreSQL database."""

from sqlalchemy import Column, ForeignKey, Integer, String, DateTime
from sqlalchemy.orm import relationship
from .database import Base


class Equip(Base):
    """Таблица для представления объекта."""

    __tablename__ = "equip"

    # fields
    id = Column(Integer, primary_key=True)
    name = Column(String)
    description = Column(String)
    tech_params = Column(String)

    # relations
    events = relationship("Event", back_populates="equip")


class EventType(Base):
    """Таблица для типов событий в журнале оператора."""

    __tablename__ = "event_type"

    # fields
    id = Column(Integer, primary_key=True)
    name = Column(String)
    description = Column(String)
    color = Column(String)

    # relations
    events = relationship("Event", back_populates="event_type")


class Event(Base):
    """Таблица для журнала оператора."""

    __tablename__ = "event"

    # fields
    id = Column(Integer, primary_key=True)
    ts = Column(DateTime)
    description = Column(String)

    # relations
    event_type_id = Column(Integer, ForeignKey("event_type.id"))
    event_type = relationship("EventType", back_populates="events")

    equip_id = Column(Integer, ForeignKey("equip.id"))
    equip = relationship("Equip", back_populates="events")
