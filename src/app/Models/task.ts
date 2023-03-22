export class Task {
  id!: number;
  important!: boolean;
  description?: string;

  constructor(task: { id: number; description?: string; important: boolean }) {
    this.id = task.id;
    this.important = task.important;
    this.description = task.description;
  }
}
