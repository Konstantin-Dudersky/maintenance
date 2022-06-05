export class Event {
    event_id: number;
    equip_id: number;
    datetime: Date;
    description: string;

    constructor(equip_id: number, datetime: Date) {
        this.event_id = 0;
        this.equip_id = equip_id;
        this.datetime = datetime;
        this.description = '';
    }
}
