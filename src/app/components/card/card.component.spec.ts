import { TasksServiceMock } from 'src/app/services/tasks/mock.tasks.service';
import { CardComponent } from './card.component';
import { TaskSelected } from 'src/app/Models/taskSelected';

describe('CardComponent', () => {
  let component = new CardComponent(TasksServiceMock());
  beforeEach(() => {
    component.card = {
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
    };
    component.selectedTasks = [];
    component.ToggleTaskForm = false;
    component.important = false;
    component.description = undefined;
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onTaskSelectionChange', () => {
    it('should find the task by id from @param selectedTask', () => {
      let taskSelected: TaskSelected = { id: 1, isSelected: true };
      component.onTaskSelectionChange(taskSelected);
      expect(
        component.selectedTasks[component.selectedTasks.length - 1].id
      ).toEqual(taskSelected.id);

      expect(
        component.selectedTasks[component.selectedTasks.length - 1].description
      ).toEqual('Task 1 for Card 1');
    });

    it('should add task to @param selectedTasks', () => {
      let taskSelected: TaskSelected = { id: 1, isSelected: true };
      component.onTaskSelectionChange(taskSelected);
      expect(component.selectedTasks.length).toEqual(1);
    });

    it('should remove task to @param selectedTasks', () => {
      component.selectedTasks.push(component.card.tasks[0]);
      let taskSelected: TaskSelected = { id: 1, isSelected: false };
      component.onTaskSelectionChange(taskSelected);
      expect(component.selectedTasks.length).toEqual(0);
    });
  });

  describe('deleteSelectedTasks', () => {
    it('will invoke tasksService.deleteTasks with correct @parm', () => {
      component.selectedTasks.push(
        component.card.tasks[0],
        component.card.tasks[1]
      );
      component.deleteSelectedTasks();
      expect(component.tasksService.deleteTasks).toHaveBeenCalledWith(
        component.card.id,
        [1, 2]
      );
    });

    it('will remove all Selected tasks (2 task selected here)', () => {
      component.selectedTasks.push(
        component.card.tasks[0],
        component.card.tasks[1]
      );
      component.deleteSelectedTasks();
      expect(component.card.tasks.length).toEqual(2);
    });

    it('will remove all Selected tasks (1 task selected here)', () => {
      component.selectedTasks.push(component.card.tasks[0]);
      component.deleteSelectedTasks();
      expect(component.card.tasks.length).toEqual(3);
    });

    it('will remove all Selected tasks (no task selected here)', () => {
      component.deleteSelectedTasks();
      expect(component.card.tasks.length).toEqual(4);
    });

    it('will make component.selectedTasks array empty', () => {
      component.selectedTasks.push(component.card.tasks[0]);
      component.deleteSelectedTasks();
      expect(component.selectedTasks.length).toEqual(0);
    });
  });

  describe('deleteAllTasks', () => {
    it('will invoke tasksService.deleteAllTasks with correct @parm', () => {
      component.deleteAllTasks();
      expect(component.tasksService.deleteAllTasks).toHaveBeenCalledWith(
        component.card.id
      );
    });

    it('should remove all tasks from the card', () => {
      component.deleteAllTasks();
      expect(component.card.tasks.length).toEqual(0);
    });

    it('should make component.selectedTasks array empty', () => {
      component.deleteAllTasks();
      expect(component.selectedTasks.length).toEqual(0);
    });
  });

  describe('deleteOneTask', () => {
    it('deleteOneTask will remove one task', () => {
      component.deleteOneTask(2);
      expect(component.card.tasks.length).toEqual(3);
    });

    it('should remove the task by its id', () => {
      component.deleteOneTask(2);
      const tasks = component.card.tasks.find((task) => task.id === 2);
      expect(tasks).toEqual(undefined);
    });

    it('should invoke tasksService.deleteTask with correct @param', () => {
      component.deleteOneTask(2);
      expect(component.tasksService.deleteTask).toHaveBeenCalledWith(
        component.card.id,
        2
      );
    });
  });

  describe('ToggleAddTaskFrom', () => {
    it('ToggleTaskFrom initial value will be false', () => {
      expect(component.ToggleTaskForm).toBeFalse();
    });

    it('ToggleTaskFrom after toggle it will be true', () => {
      component.ToggleAddTaskFrom();
      expect(component.ToggleTaskForm).toBeTrue();
    });
  });

  describe('onSubmitTask', () => {
    it('will invoke tasksService.addTask with correct @parm', () => {
      component.description = 'description';
      component.important = true;
      let taskToAdd = {
        id: 5,
        important: true,
        description: 'description',
      };
      component.onSubmitTask();
      expect(component.tasksService.addTask).toHaveBeenCalledWith(
        component.card.id,
        taskToAdd
      );
    });

    it('should add one task to the card', () => {
      component.onSubmitTask();
      expect(component.card.tasks.length).toEqual(5);
      expect(component.card.tasks[4].id).toEqual(5);
    });

    it('should create task when card is empty with id 1', () => {
      component.card.tasks = [];
      component.onSubmitTask();
      expect(component.card.tasks.length).toEqual(1);
      expect(component.card.tasks[0].id).toEqual(1);
    });

    it('should toggle the task submit form', () => {
      component.onSubmitTask();
      expect(component.ToggleTaskForm).toBeFalse();
    });
  });
});
