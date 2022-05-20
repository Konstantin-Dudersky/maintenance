"""Start script for fastapi."""

from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
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
        url="postgresql://postgres:postgres@localhost:5432/maintenance",
    )()
    try:
        yield db
    finally:
        db.close()


@app.get("/api")
async def root():
    return "123"


@app.get("/api/objects/", response_model=list[schemas.Object])
async def objects(
    db: Session = Depends(get_db),
) -> list[schemas.Object]:
    return crud.read_objects(db)


@app.get("/api/object/{id}/", response_model=schemas.Object)
async def object_id(
    id: int,
    db: Session = Depends(get_db),
) -> schemas.Object:
    return crud.read_object_by_id(db, id)


@app.post("/api/equip/", response_model=schemas.Object)
async def post_equip(
    equip: schemas.Object,
    db: Session = Depends(get_db),
) -> schemas.Object:
    return crud.create_equip(db, equip)


@app.patch("/api/equip/", response_model=schemas.Object)
async def patch_equip(
    equip: schemas.Object,
    db: Session = Depends(get_db),
) -> schemas.Object:
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


if __name__ == "__main__":
    uvicorn.run(
        app,
        host="0.0.0.0",
    )
