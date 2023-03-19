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

  deleteTasks(cardId: number, tasks: Task[]): void {
    let data = JSON.parse(localStorage.getItem('MyJson')!);
    const cardIndex = data.findIndex((card: any) => card.id === cardId);

    tasks.forEach((taskF) => {
      const taskIndex = data[cardIndex].tasks.findIndex(
        (task: any) => task.id === taskF.id
      );
      if (cardIndex !== -1 && taskIndex !== -1) {
        data[cardIndex].tasks.splice(taskIndex, 1);
        localStorage.setItem('MyJson', JSON.stringify(data));
      }
    });
  }

  deleteTask(cardId: number, taskId: number): void {
    let data = JSON.parse(localStorage.getItem('MyJson')!);

    const cardIndex = data.findIndex((card: any) => card.id === cardId);
    const taskIndex = data[cardIndex].tasks.findIndex(
      (task: any) => task.id === taskId
    );

    if (cardIndex !== -1 && taskIndex !== -1) {
      data[cardIndex].tasks.splice(taskIndex, 1);
      localStorage.setItem('MyJson', JSON.stringify(data));
    }
  }

  addTask(cardId: number, task: Task) {
    let data = JSON.parse(localStorage.getItem('MyJson')!);
    let cardIndex = data.findIndex((card: any) => card.id === cardId);
    if (cardIndex !== -1) {
      data[cardIndex].tasks.push(task);
      localStorage.setItem('MyJson', JSON.stringify(data));
    }
  }

  updateTask(cardId: number, taskU: Task) {
    let data = JSON.parse(localStorage.getItem('MyJson')!);

    const cardIndex = data.findIndex((card: any) => card.id === cardId);
    const taskIndex = data[cardIndex].tasks.findIndex(
      (task: any) => task.id === taskU.id
    );

    if (cardIndex !== -1 && taskIndex !== -1) {
      data[cardIndex].tasks[taskIndex].description = taskU.description;
      data[cardIndex].tasks[taskIndex].important = taskU.important;
      localStorage.setItem('MyJson', JSON.stringify(data));
    }
  }
}
