"""Schemas for pydantic."""

from pydantic import BaseModel


class Object(BaseModel):
    id: int | None
    name: str | None
    description: str | None
    tech_params: str | None

    class Config:
        """Config for schema."""

        orm_mode = True
