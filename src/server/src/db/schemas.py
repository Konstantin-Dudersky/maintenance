"""Schemas for pydantic."""

from pydantic import BaseModel


class Equip(BaseModel):
    """Представление для Equip."""

    equip_id: int | None
    name: str | None
    description: str | None
    tech_params: str | None

    class Config:
        """Config for schema."""

        orm_mode = True


class Events(BaseModel):
    """Представление для Events."""

    event_id: int | None
    description: str | None

    class Config:
        """Config for schema."""

        orm_mode = True
