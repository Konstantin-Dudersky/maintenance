"""Schemas for pydantic."""

from pydantic import BaseModel

from src.db.models import EventTypes


class Equip(BaseModel):
    """Представление для Equip."""

    equip_id: int
    name: str | None
    description: str | None
    tech_params: str | None

    class Config:
        """Config for schema."""

        orm_mode = True


class Event(BaseModel):
    """Представление для Event."""

    event_id: int
    event_type_id: int
    description: str | None

    class Config:
        """Config for schema."""

        orm_mode = True


class EventType(BaseModel):
    """Типы событий."""

    event_type_id: int
    name: EventTypes
    description: str

    class Config:
        """Config for schema."""

        orm_mode = True


class EventPlan(BaseModel):
    """План работ."""

    event_plan_id: int
    equip_id: int
    event_type: EventType
    name: str
    description: str
    value: int

    class Config:
        """Config for schema."""

        orm_mode = True
