import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from 'src/app/Models/task';
import { TasksService } from 'src/app/services/tasks/tasks.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent {
  toggleUpdateForm = false;
  important: boolean = false;
  description?: string;

  @Input() task?: Task;
  @Input() cardId?: number;
  @Output() selectionChange = new EventEmitter<{
    id: number;
    isSelected: boolean;
  }>();
  @Output() selectedTask = new EventEmitter<Task>();

  constructor(private tasksService: TasksService) {}

  isSelected: boolean = false;

  onSelectionChange(id: number, isSelected: boolean = this.isSelected) {
    this.selectionChange.emit({ id, isSelected });
  }

  onPressDelete() {
    this.selectedTask.emit(this.task);
  }
  ShowUpdateForm() {
    this.toggleUpdateForm = !this.toggleUpdateForm;
  }
  onSubmit() {
    let updatedTask = this.task;
    updatedTask!.description = this.description!;
    updatedTask!.important = this.important;
    this.tasksService.updateTask(this.cardId!, updatedTask!);
    this.toggleUpdateForm = false;
  }
}
