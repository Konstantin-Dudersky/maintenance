"""Schemas for pydantic."""

from pydantic import BaseModel


class Object(BaseModel):
    id: int
    name: str
    description: str
    tech_params: str

    class Config:
        """Config for schema."""

        orm_mode = True
