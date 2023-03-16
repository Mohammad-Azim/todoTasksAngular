import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from 'src/app/Models/task';
import { Card } from 'src/app/Models/card';
import { JSON_DATA_PATH } from 'src/app/globals';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private http: HttpClient) {}

  createTask(cardId: number, task: Task): Observable<Card> {
    const url = `${JSON_DATA_PATH}/${cardId}/tasks`;
    return this.http.post<Card>(url, task);
  }

  deleteTask(cardId: number, taskId: number): Observable<Card> {
    const url = `${JSON_DATA_PATH}/${cardId}/tasks/${taskId}`;
    return this.http.delete<Card>(url);
  }

  deleteTasks(cardId: number, taskIds: number[]): Observable<Card> {
    const url = `${JSON_DATA_PATH}/${cardId}/tasks/delete-multiple`;
    return this.http.post<Card>(url, taskIds);
  }
}
