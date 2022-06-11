# Структура БД

```mermaid
%%{init: {'theme':'neutral'}}%%
erDiagram
 	Equip ||--o{ Event : equip_id
 	Event }|--|| EventType : event_type_id
 	Event }|--|| EventStatus : event_status_id
 	EventPlan }o--|| Equip : equip_id
 	EventPlan }o--|| EventType : event_type_id
 	
    Equip {
        int equip_id PK
        string name
        string description
        string tech_params
    }
    
    %% Плановые / внеплановые работы
    EventType {
    	int event_type_id PK
    	string name
    	string description
    	string color
    }
    
    %% План / в работе / выполнено
    EventStatus {
    	int event_status_id PK
    	string name
    	string color
    }
    
    %% Планируемые работы, составление расписания
    EventPlan {
    	int event_plan_id PK
    	int equip_id FK
    	int event_type_id FK
    	int value "Период выполнения"
    }
    
    %% Факт. работы
    Event {
    	int event_id PK
    	int equip_id FK
    	int event_type_id FK
    	int event_status_id FK
    	datetime ts
    	string description
    }
    
```

