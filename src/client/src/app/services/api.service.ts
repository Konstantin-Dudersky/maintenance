import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Object } from '../models/object';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  IP = 'http://localhost:8000'

  constructor(private http: HttpClient) { }

  readObjects() {
    return this.http.get<Object[]>(
      `${this.IP}/api/objects`
    );
  }

}
