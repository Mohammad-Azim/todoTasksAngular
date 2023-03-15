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
export class TasksService {
  private baseUrl = '../../../assets/db.json';

  constructor(private http: HttpClient) {}

  createTask(cardId: number, task: Task): Observable<Card> {
    const url = `${this.baseUrl}/${cardId}/tasks`;
    return this.http.post<Card>(url, task);
  }

  deleteTask(cardId: number, taskId: number): Observable<Card> {
    const url = `${this.baseUrl}/${cardId}/tasks/${taskId}`;
    return this.http.delete<Card>(url);
  }

  deleteTasks(cardId: number, taskIds: number[]): Observable<Card> {
    const url = `${this.baseUrl}/${cardId}/tasks/delete-multiple`;
    return this.http.post<Card>(url, taskIds);
  }
}
