import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Card } from 'src/app/Models/card';
import { Task } from 'src/app/Models/task';
import { TasksService } from 'src/app/services/tasks/tasks.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  selectedTasks: Task[] = [];
  ToggleTaskFrom: boolean = false;
  important: boolean = false;
  description?: string;

  @Input() card!: Card;
  @ViewChild('AllTasks') allTasks!: ElementRef;

  constructor(private tasksService: TasksService) {}
  ngOnInit(): void {}

  onTaskSelectionChange(taskVal: any) {
    let indTask = this.card.tasks.find((task) => task.id == taskVal.id);
    if (indTask != undefined) {
      if (taskVal.isSelected == true) {
        if (indTask && !this.selectedTasks.includes(indTask)) {
          this.selectedTasks.push(indTask);
        }
      } else {
        var index = this.selectedTasks.indexOf(indTask);
        if (index !== -1) {
          this.selectedTasks.splice(index, 1);
        }
      }
    }
    console.log(this.selectedTasks); //#??#
  }

  deleteSelectedTasks() {
    this.tasksService.deleteTasks(this.card.id, this.selectedTasks);
    this.selectedTasks.forEach((selectedTask) => {
      const index = this.card.tasks.indexOf(selectedTask);
      if (index !== -1) {
        this.card.tasks.splice(index, 1);
      }
    });
    this.selectedTasks = [];
  }

  deleteAllTasks() {
    this.card.tasks = [];
    this.selectedTasks = [];
  }

  deleteOneTask(selectedTask: Task) {
    const index = this.card.tasks.indexOf(selectedTask);
    this.card.tasks.splice(index, 1);
    this.tasksService.deleteTask(this.card.id, selectedTask.id);
  }

  unSelectAll() {
    window.alert('UnSelectAll Not finished');
  }

  ToggleAddTaskFrom() {
    this.ToggleTaskFrom = !this.ToggleTaskFrom;
  }

  onSubmitTask() {
    let newTask = this.card.tasks[this.card.tasks.length - 1];
    console.log(newTask);
    newTask.id = newTask.id + 1;

    newTask.description = this.description!;
    newTask.important = this.important;

    this.tasksService.addTask(this.card.id, newTask);
    this.card.tasks.push(newTask);
    this.ToggleTaskFrom = false;
  }
}
