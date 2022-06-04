"""Start script for fastapi."""

from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware

from sqlalchemy.orm import Session

from src.settings import settings

import uvicorn

from .db import crud, schemas
from .db.database import get_sessionmaker


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db() -> Session:
    """Dependency."""
    db = get_sessionmaker(
        url=settings.pg_dsn,
    )()
    try:
        yield db
    finally:
        db.close()


@app.get("/api")
async def root():
    return "123"


@app.get("/api/objects/", response_model=list[schemas.Equip])
async def objects(
    db: Session = Depends(get_db),
) -> list[schemas.Equip]:
    return crud.read_objects(db)


@app.get("/api/object/{id}/", response_model=schemas.Equip)
async def object_id(
    id: int,
    db: Session = Depends(get_db),
) -> schemas.Equip:
    equip = crud.read_object_by_id(db, id)
    if equip is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    return equip


@app.post("/api/equip/", response_model=schemas.Equip)
async def post_equip(
    equip: schemas.Equip,
    db: Session = Depends(get_db),
) -> schemas.Equip:
    return crud.create_equip(db, equip)


@app.patch("/api/equip/", response_model=schemas.Equip)
async def patch_equip(
    equip: schemas.Equip,
    db: Session = Depends(get_db),
) -> schemas.Equip:
    existing_equip = crud.read_object_by_id(db, equip.id)
    if existing_equip is None:
        pass
    return crud.update_equip_by_id(
        db=db,
        existing_equip=existing_equip,
        updated_equip=equip,
    )


@app.delete("/api/equip/{id}/")
async def delete_equip_by_id(
    id: int,
    db: Session = Depends(get_db),
) -> None:
    crud.delete_equip_by_id(db, id)


@app.get("/api/equip-stat-events/{id}")
async def read_equip_stat_events(
    id: int,
    db: Session = Depends(get_db),
):
    events = crud.read_equip_stat_events(db, id)
    if events is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    return events


if __name__ == "__main__":
    uvicorn.run(
        app,
        host="0.0.0.0",
    )
