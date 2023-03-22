import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { last } from 'rxjs';
import { Card } from 'src/app/Models/card';
import { Task } from 'src/app/Models/task';
import { TaskSelected } from 'src/app/Models/taskSelected';
import { TasksService } from 'src/app/services/tasks/tasks.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  selectedTasks: Task[] = [];
  ToggleTaskForm: boolean = false;
  important: boolean = false;
  description?: string;

  @Input() card!: Card;

  constructor(public tasksService: TasksService) {}

  /**
   *
   * @param taskVal this variable will contain id and is Selected boolean value
   *
   * getting the task data by the id from @param taskVal
   *
   * if the isSelected true will add the task to the selected Tasks
   * else that mean the task in the selected tasks and should be removed
   */
  onTaskSelectionChange(taskVal: TaskSelected) {
    let indTask = this.card.tasks.find((task) => task.id == taskVal.id);
    if (taskVal.isSelected == true) {
      this.selectedTasks.push(indTask!);
    } else {
      var index = this.selectedTasks.indexOf(indTask!);
      this.selectedTasks.splice(index, 1);
    }
  }

  /**
   * on click will remove all tasks in selectedTasks array ( all selected tasks)
   */
  deleteSelectedTasks() {
    let ids: number[] = this.selectedTasks.map((task) => task.id);
    this.tasksService.deleteTasks(this.card.id, ids);
    this.selectedTasks.forEach((selectedTask) => {
      const index = this.card.tasks.indexOf(selectedTask);
      this.card.tasks.splice(index, 1);
    });
    this.selectedTasks = [];
  }

  /**
   * on click will delete all Tasks by for current Card
   */
  deleteAllTasks() {
    this.tasksService.deleteAllTasks(this.card.id);
    this.card.tasks = [];
    this.selectedTasks = [];
  }

  /**
   *
   * @param taskId task id that you wanna to delete
   *
   * update this.card.tasks (remove task form the current card updating the ui)
   * then call tasksService.deleteTask() to remove task from the local storage
   */
  deleteOneTask(taskId: number) {
    this.card.tasks = this.card.tasks.filter(
      (task: Task) => task.id !== taskId
    );
    this.tasksService.deleteTask(this.card.id, taskId);
  }

  /**
   * Toggle the form giving the ability to add new task to form
   */
  ToggleAddTaskFrom() {
    this.ToggleTaskForm = !this.ToggleTaskForm;
  }

  /**
   * on Adding new task will add task to the current card
   * then update the ui
   *
   * call tasksService.addTask() to add task to the localStorage
   */
  onSubmitTask() {
    //#??# instead of make one you should pass it as prop
    let lastId = this.card.tasks[this.card.tasks.length - 1]?.id ?? 1;
    let newTaskId = lastId === 1 ? lastId : lastId + 1;

    let newTask: Task = {
      id: newTaskId,
      description: this.description,
      important: this.important,
    };

    this.tasksService.addTask(this.card.id, newTask);
    this.card.tasks.push(newTask);
    this.ToggleTaskForm = false;
  }
}
