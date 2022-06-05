"""Start script for fastapi."""

from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware

from sqlalchemy.orm import Session

from src.db import crud, schemas
from src.db.database import get_sessionmaker
from src.settings import settings
from src.utils.export_openapi import export

import uvicorn


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
async def index() -> str:
    """Angular app."""
    return "Angular app."


@app.get("/api/equips/", response_model=list[schemas.Equip])
async def get_equips(
    db: Session = Depends(get_db),
) -> list[schemas.Equip]:
    """Возвращает перечень всего оборудования."""
    return crud.read_equips(db)


@app.get("/api/equip/{equip_id}/", response_model=schemas.Equip)
async def get_equips_by_id(
    equip_id: int,
    db: Session = Depends(get_db),
) -> schemas.Equip:
    """Возвращает оборудование по equip_id."""
    equip = crud.read_equip_by_id(db, equip_id)
    if equip is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    return equip


@app.post("/api/equip/", response_model=schemas.Equip)
async def post_equip(
    equip: schemas.Equip,
    db: Session = Depends(get_db),
) -> schemas.Equip:
    """Создает новое оборудование."""
    return crud.create_equip(db, equip)


@app.patch("/api/equip/", response_model=schemas.Equip)
async def patch_equip(
    equip: schemas.Equip,
    db: Session = Depends(get_db),
) -> schemas.Equip:
    """Обновляет оборудование."""
    existing_equip = crud.read_equip_by_id(db, equip.equip_id)
    if existing_equip is None:
        pass
    return crud.update_equip_by_id(
        db=db,
        existing_equip=existing_equip,
        updated_equip=equip,
    )


@app.delete("/api/equip/{event_id}/")
async def delete_equip_by_id(
    event_id: int,
    db: Session = Depends(get_db),
) -> None:
    """Удаляет оборудование по equip_id."""
    crud.delete_equip_by_id(db, event_id)


@app.get("/api/events/{event_id}/", response_model=list[schemas.Events])
async def get_events_by_id(
    event_id: int,
    db: Session = Depends(get_db),
) -> list[schemas.Events]:
    """Возвращает журнал по equip_id."""
    events = crud.read_event_by_id(db, event_id)
    if events is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    return events


def export_openapi() -> None:
    """Экспортировать спецификацию openapi в файл."""
    export(app, "../../docs/api-docs.html")


if __name__ == "__main__":
    # TODO:0 фильтр сообщений для uvicorn
    uvicorn.run(
        app,
        host="0.0.0.0",
    )
