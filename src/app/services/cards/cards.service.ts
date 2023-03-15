import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Task {
  id: number;
  important: boolean;
  description: string;
}

interface Card {
  id: number;
  name: string;
  tasks: Task[];
}

@Injectable({
  providedIn: 'root',
})
export class CardsService {
  private baseUrl = '../../../assets/db.json';

  constructor(private http: HttpClient) {}

  getCards(): Observable<Card[]> {
    return this.http.get<Card[]>(this.baseUrl);
  }

  getCardById(id: number): Observable<Card> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Card>(url);
  }
  addCard(name: string): Observable<Card> {
    const card = { name, tasks: [] };
    return this.http.post<Card>(this.baseUrl, card);
  }
  updateCard(card: Card): Observable<Card> {
    const url = `${this.baseUrl}/${card.id}`;
    return this.http.put<Card>(url, card);
  }
  deleteCard(id: number): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete(url);
  }
}
