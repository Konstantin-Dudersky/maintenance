"""Database connection."""

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

Base = declarative_base()


def get_sessionmaker(url: str) -> sessionmaker:
    """Create session for db connection."""
    engine = create_engine(
        url=url,
        echo=False,
        future=True,
    )
    session_maker = sessionmaker(
        autocommit=False,
        autoflush=False,
        bind=engine,
    )
    Base.metadata.create_all(bind=engine)
    return session_maker()
