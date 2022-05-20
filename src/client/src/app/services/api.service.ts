import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Equip } from '../models/equip';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  IP = 'http://localhost:8000'

  constructor(private http: HttpClient) { }

  createObject(equip: Equip) {
    return this.http.post<Equip>(
      `${this.IP}/api/equip/`,
      equip,
    )
  }

  readObjects() {
    return this.http.get<Equip[]>(
      `${this.IP}/api/objects/`,
    );
  }

  readObjectById(id: number) {
    return this.http.get<Equip>(
      `${this.IP}/api/object/${id}/`,
    );
  }

  patchEquip(equip: Equip) {
    return this.http.patch<Equip>(
      `${this.IP}/api/equip/`, equip,
    );
  }

  deleteEquip(id: number) {
    return this.http.delete(
      `${this.IP}/api/equip/${id}/`
    )
  }

}
