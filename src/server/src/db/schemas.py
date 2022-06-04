"""Schemas for pydantic."""

from pydantic import BaseModel


class Equip(BaseModel):
    id: int | None
    name: str | None
    description: str | None
    tech_params: str | None

    class Config:
        """Config for schema."""

        orm_mode = True


class Events(BaseModel):
    id: int | None
    description: str | None

    class Config:
        """Config for schema."""

        orm_mode = True
