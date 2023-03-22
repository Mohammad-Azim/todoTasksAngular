import { Task } from 'src/app/Models/task';
import { TasksService } from './tasks.service';

describe('TasksService', () => {
  let service = new TasksService();

  beforeEach(() => {
    service.data = [
      {
        id: 1,
        name: 'Card 1',
        tasks: [
          {
            id: 1,
            important: false,
            description: 'Task 1 for Card 1',
          },
          {
            id: 2,
            important: true,
            description: 'Task 2 for Card 1',
          },
          {
            id: 3,
            important: true,
            description: 'Task 3 for Card 1',
          },
          {
            id: 4,
            important: true,
            description: 'Task 4 for Card 1',
          },
        ],
      },
      {
        id: 2,
        name: 'Card 2',
        tasks: [
          {
            id: 1,
            important: false,
            description: 'Task 1 for Card 2',
          },
          {
            id: 2,
            important: true,
            description: 'Task 2 for Card 2',
          },
        ],
      },
    ];
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('deleteTasks', () => {
    it('delete task 1 and 2 from card 1', () => {
      service.deleteTasks(1, [1, 2]);
      expect(service.data[0].tasks.length).toEqual(2);
    });

    it('make sure from the id of deleted tasks', () => {
      service.deleteTasks(1, [1, 2]);
      expect(service.data[0].tasks[0].id).toEqual(3);
    });
  });

  describe('deleteAllTasks', () => {
    it('delete all tasks from card 1', () => {
      service.deleteAllTasks(1);
      expect(service.data[0].tasks.length).toEqual(0);
    });
  });

  describe('deleteTask', () => {
    it('delete task 1 from card 1', () => {
      service.deleteTask(1, 1);
      expect(service.data[0].tasks.length).toEqual(3);
    });

    it('make sure from the id of deleted task', () => {
      service.deleteTask(1, 1);
      expect(service.data[0].tasks[0].id).toEqual(2);
    });
  });

  describe('addTask', () => {
    it('addTask to card 1', () => {
      const taskToAdd: Task = {
        id: 5,
        important: true,
        description: 'inserted description',
      };
      service.addTask(1, taskToAdd);
      expect(service.data[0].tasks.length).toEqual(5);
      expect(
        service.data[0].tasks[service.data[0].tasks.length - 1].id
      ).toEqual(5);
      expect(
        service.data[0].tasks[service.data[0].tasks.length - 1].description
      ).toEqual('inserted description');
    });
  });

  describe('updateTask', () => {
    it('updateTask task 1 from card 1', () => {
      const updatedTask: Task = {
        id: 1,
        important: true,
        description: 'updated description',
      };
      service.updateTask(1, updatedTask);
      expect(service.data[0].tasks[0].description).toEqual(
        updatedTask.description
      );
      expect(service.data[0].tasks[0].important).toEqual(updatedTask.important);
      expect(service.data[0].tasks[0].id).toEqual(updatedTask.id);
    });
  });

  describe('saveChanges', () => {
    beforeEach(() => {
      spyOn(window.localStorage, 'setItem').and.callFake(
        (key, value) => (localStorage[key] = value + '')
      );
    });

    it('should save changes to local storage', () => {
      service.saveChanges();
      expect(window.localStorage.setItem).toHaveBeenCalled();
    });
  });
});
