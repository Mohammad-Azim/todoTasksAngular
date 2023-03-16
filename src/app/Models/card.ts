import { Task } from './task';

export interface Card {
  id: number;
  name: string;
  tasks: Task[];
}
