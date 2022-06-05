# Структура БД

```mermaid
%%{init: {'theme':'neutral'}}%%
erDiagram
 	Equip ||--o{ Event : contains
 	Event }|--|| EventType : is
    Equip {
        int equip_id PK
        string name
        string description
        string tech_params
    }
    Event {
    	int event_id PK
    	int equip_id FK
    	int event_type FK
    	datetime ts
    	string description
    }
    EventType {
    	int event_type_id PK
    	string name
    	string description
    	string color
    }
```

