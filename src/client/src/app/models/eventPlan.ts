import { EventType } from "./eventType";

export interface EventPlan {
    event_plan_id: number;
    equip_id: number;
    event_type: EventType;
    name: string;
    description: string;
    value: number;
}
