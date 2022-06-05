"""Schemas for pydantic."""

from pydantic import BaseModel


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
    name: str
    description: str

    class Config:
        """Config for schema."""

        orm_mode = True
