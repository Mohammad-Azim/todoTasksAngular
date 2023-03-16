import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from 'src/app/Models/task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent {
  @Input() task?: Task;
  @Output() selectionChange = new EventEmitter<{
    id: number;
    isSelected: boolean;
  }>();
  @Output() selectedTask = new EventEmitter<Task>();

  isSelected: boolean = false;

  onSelectionChange(id: number, isSelected: boolean = this.isSelected) {
    this.selectionChange.emit({ id, isSelected });
  }

  onPressDelete() {
    this.selectedTask.emit(this.task);
  }
}
