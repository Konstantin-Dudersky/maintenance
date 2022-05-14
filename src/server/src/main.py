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


@app.get("/api/objects", response_model=list[schemas.Object])
async def objects(
    db: Session = Depends(get_db),
) -> list[schemas.Object]:
    return crud.read_objects(db)


if __name__ == "__main__":
    uvicorn.run(
        app,
        host="0.0.0.0",
    )
