import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
}
