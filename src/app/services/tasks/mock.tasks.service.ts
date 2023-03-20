import { Card } from 'src/app/Models/card';
import { TasksService } from './tasks.service';

export const TasksServiceMock = (): TasksService => {
  return {
    data: null as unknown as Card[],
    deleteTasks: jasmine.createSpy('deleteTasks'),
    deleteAllTasks: jasmine.createSpy('deleteAllTasks'),
    deleteTask: jasmine.createSpy('deleteTask'),
    addTask: jasmine.createSpy('addTask'),
    updateTask: jasmine.createSpy('updateTask'),
    saveChanges: jasmine.createSpy('saveChanges'),
  };
};
