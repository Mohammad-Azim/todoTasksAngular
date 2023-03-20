import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Card } from 'src/app/Models/card';

@Injectable({
  providedIn: 'root',
})
export class CardsService {
  constructor(public http: HttpClient) {}

  getCards(): Observable<Card[]> {
    return this.http.get<Card[]>('./../../../assets/db.json');
  }
}
