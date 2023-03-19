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
  @Output() selectedTask = new EventEmitter<number>();

  constructor(private tasksService: TasksService) {}

  isSelected: boolean = false;

  /**
   * will called when ever task check box change it's state
   * and emit the changes to the parent component (Card component)
   * @param id the id for Task
   * @param isSelected if the task selected or not boolean
   */
  onSelectionChange(id: number, isSelected: boolean = this.isSelected) {
    this.selectionChange.emit({ id, isSelected });
  }

  /**
   * will emit the parent that the delete button was
   * pressed and send the id for the task wanna to delete
   */
  onPressDelete() {
    this.selectedTask.emit(this.task!.id);
  }

  /**
   * toggle to show or hide the update task form
   */
  ShowUpdateForm() {
    this.toggleUpdateForm = !this.toggleUpdateForm;
  }

  /**
   * will be called when ever the update task form is submitted
   * @param task the task to update
   */
  onSubmit() {
    let updatedTask = this.task;
    updatedTask!.description = this.description!;
    updatedTask!.important = this.important;
    this.tasksService.updateTask(this.cardId!, updatedTask!);
    this.toggleUpdateForm = false;
  }
}
