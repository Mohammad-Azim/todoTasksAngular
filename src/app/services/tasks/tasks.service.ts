import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from 'src/app/Models/task';
import { Card } from 'src/app/Models/card';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor() {}
  data = JSON.parse(localStorage.getItem('MyJson')!);

  /**
   * delete multiple tasks at once from one card
   * @param cardId card id that contain the tasks you wanna delete
   * @param tasksIds array of the tasks id's you wanna delete
   */
  deleteTasks(cardId: number, tasksIds: number[]): void {
    const cardIndex = this.data.findIndex((card: Card) => card.id === cardId);
    tasksIds.forEach((taskId) => {
      const taskIndex = this.data[cardIndex].tasks.findIndex(
        (task: Task) => task.id === taskId
      );
      this.data[cardIndex].tasks.splice(taskIndex, 1);
      this.saveChanges();
    });
  }

  /**
   * remove all tasks from card by card id
   * @param cardId
   */
  deleteAllTasks(cardId: number) {
    const cardIndex = this.data.findIndex((card: Card) => card.id === cardId);
    this.data[cardIndex].tasks = [];
    this.saveChanges();
  }

  /**
   * delete one task from card by card id and task id
   * @param cardId
   * @param taskId
   */
  deleteTask(cardId: number, taskId: number): void {
    const cardIndex = this.data.findIndex((card: Card) => card.id === cardId);
    const taskIndex = this.data[cardIndex].tasks.findIndex(
      (task: Task) => task.id === taskId
    );
    this.data[cardIndex].tasks.splice(taskIndex, 1);
    this.saveChanges();
  }

  /**
   * add one task to card by it's id
   * @param cardId
   * @param task
   */
  addTask(cardId: number, task: Task) {
    let cardIndex = this.data.findIndex((card: Card) => card.id === cardId);
    this.data[cardIndex].tasks.push(task);
    this.saveChanges();
  }

  /**
   * Update one Task from card by card id
   * @param cardId
   * @param updatedTask the task with updated value (id never updated)
   */
  updateTask(cardId: number, updatedTask: Task) {
    const cardIndex = this.data.findIndex((card: Card) => card.id === cardId);
    const taskIndex = this.data[cardIndex].tasks.findIndex(
      (task: Task) => task.id === updatedTask.id
    );

    this.data[cardIndex].tasks[taskIndex].description = updatedTask.description;
    this.data[cardIndex].tasks[taskIndex].imp = updatedTask.important;
    this.saveChanges();
  }

  /**
   * save changes to the local storage
   */
  saveChanges() {
    localStorage.setItem('MyJson', JSON.stringify(this.data));
  }
}
