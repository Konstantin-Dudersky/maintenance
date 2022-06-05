import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Equip } from '../models/equip';
import { Event } from '../models/event';
import { Observable } from 'rxjs';
import { EventType } from '../models/eventType';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  IP = 'http://192.168.116.59:8000';

  constructor(private http: HttpClient) { }

  createEquip(equip: Equip): Observable<Equip> {
    return this.http.post<Equip>(
      `${this.IP}/api/equip/`,
      equip,
    )
  }

  readEquips(): Observable<Equip[]> {
    return this.http.get<Equip[]>(
      `${this.IP}/api/equips/`,
    );
  }

  readEquipById(equip_id: number) {
    return this.http.get<Equip>(
      `${this.IP}/api/equip/${equip_id}/`,
    );
  }

  patchEquip(equip: Equip) {
    return this.http.patch<Equip>(
      `${this.IP}/api/equip/`, equip,
    );
  }

  deleteEquip(equip_id: number) {
    return this.http.delete(
      `${this.IP}/api/equip/${equip_id}/`
    )
  }

  readEventsById(equip_id: number): Observable<Event[]> {
    return this.http.get<Event[]>(
      `${this.IP}/api/events/${equip_id}/`,
    )
  }

  getEventById(event_id: number): Observable<Event> {
    return this.http.get<Event>(
      `${this.IP}/api/event/${event_id}/`,
    );
  }

  readEventTypes(): Observable<EventType[]> {
    return this.http.get<EventType[]>(
      `${this.IP}/api/event-types/`,
    )
  }

}
