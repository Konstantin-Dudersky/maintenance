from db.database import get_sessionmaker
from db import models

db = get_sessionmaker(
    url="postgresql://postgres:postgres@localhost:5432/maintenance",
)()

db.add(
    models.EventType(
        name="Ремонт",
        description="Тип - ремонт",
    )
)
db.add(
    models.EventType(
        name="Обслуживание",
        description="Тип - обслуживание",
    )
)
db.commit()
