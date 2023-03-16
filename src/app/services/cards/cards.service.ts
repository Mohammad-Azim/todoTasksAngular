import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Card } from 'src/app/Models/card';
import { JSON_DATA_PATH } from 'src/app/globals';

@Injectable({
  providedIn: 'root',
})
export class CardsService {
  constructor(private http: HttpClient) {}

  getCards(): Observable<Card[]> {
    return this.http.get<Card[]>('./../../../assets/db.json');
  }
}
