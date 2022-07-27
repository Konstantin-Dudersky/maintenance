"""Models for save data in PostgreSQL database."""

import enum
from datetime import datetime

from sqlalchemy import Column, DateTime, Enum, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from .database import Base


class Equip(Base):
    """Таблица для представления объекта."""

    __tablename__ = "equip"
    # PK
    equip_id: int = Column(Integer, primary_key=True)
    # FK
    events: list["Event"] = relationship("Event", back_populates="equip")
    events_plan: list["EventPlan"] = relationship(
        "EventPlan",
        back_populates="equip",
    )
    # fields
    name: str = Column(String)
    description: str = Column(String)
    tech_params: str = Column(String)


class EventTypes(enum.Enum):
    """Перечисление типов событий."""

    PLANNED_CYCLIC = 1
    PLANNED_SINGLE = 2
    UNPLANNED = 3


class EventType(Base):
    """Таблица для типов событий в журнале оператора."""

    __tablename__ = "event_type"
    # PK
    event_type_id: int = Column(Integer, primary_key=True)
    # FK
    events: list["Event"] = relationship("Event", back_populates="event_type")
    events_plan: list["EventPlan"] = relationship(
        "EventPlan",
        back_populates="event_type",
    )
    # fields
    name: EventTypes = Column(Enum(EventTypes))
    description: str = Column(String)
    color: str = Column(String)


class EventStatuses(enum.Enum):
    """Перечисление состояний событий."""

    PLANNED = 1
    INWORK = 2
    DONE = 3


class EventStatus(Base):
    """Таблица для состояний событий в журнале оператора."""

    __tablename__ = "event_status"
    # PK
    event_status_id: int = Column(Integer, primary_key=True)
    # FK
    events: list["Event"] = relationship(
        "Event",
        back_populates="event_status",
    )
    # fields
    name: EventStatuses = Column(Enum(EventStatuses))
    description: str = Column(String)
    color: str = Column(String)


class EventPlan(Base):
    """Таблица для планирования работ."""

    __tablename__ = "event_plan"
    # PK
    event_plan_id: int = Column(Integer, primary_key=True)
    # FK
    equip_id: int = Column(Integer, ForeignKey("equip.equip_id"))
    equip: "Equip" = relationship("Equip", back_populates="events_plan")
    event_type_id: int = Column(
        Integer,
        ForeignKey("event_type.event_type_id"),
    )
    event_type: "EventType" = relationship(
        "EventType",
        back_populates="events_plan",
    )
    # fields
    name: str = Column(String)
    description: str = Column(String)
    value: int = Column(Integer)


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
    event_type: "EventType" = relationship(
        "EventType",
        back_populates="events",
    )
    event_status_id: int = Column(
        Integer,
        ForeignKey("event_status.event_status_id"),
    )
    event_status: "EventStatus" = relationship(
        "EventStatus",
        back_populates="events",
    )
    equip_id: int = Column(Integer, ForeignKey("equip.equip_id"))
    equip: "Equip" = relationship("Equip", back_populates="events")
    # fields
    description: str = Column(String)
    planned_ts: datetime = Column(DateTime)
    inwork_ts: datetime = Column(DateTime)
    done_ts: datetime = Column(DateTime)
