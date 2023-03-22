import { TasksServiceMock } from 'src/app/services/tasks/mock.tasks.service';
import { TaskComponent } from './task.component';

describe('TaskComponent', () => {
  let component = new TaskComponent(TasksServiceMock());

  beforeEach(async () => {
    component.toggleUpdateForm = false;
    component.important = false;
    component.description = undefined;
    component.isSelected = false;
    component.task = {
      id: 1,
      description: 'task 1 desc',
      important: true,
    };
    component.cardId = 1;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onSelectionChange', () => {
    it('should emit with correct param', () => {
      spyOn(component.selectionChange, 'emit');
      component.onSelectionChange(1);
      let emitTask = { id: 1, isSelected: component.isSelected };
      expect(component.selectionChange.emit).toHaveBeenCalledWith(emitTask);
    });
  });

  describe('onPressDelete', () => {
    it('should emit with correct param', () => {
      spyOn(component.selectedTask, 'emit');
      component.onPressDelete();
      expect(component.selectedTask.emit).toHaveBeenCalledWith(
        component.task.id
      );
    });
  });

  describe('ShowUpdateForm', () => {
    it('should toggle the toggleUpdateForm value', () => {
      component.toggleUpdateForm = false;
      component.ShowUpdateForm();
      expect(component.toggleUpdateForm).toBeTrue();
      component.ShowUpdateForm();
      expect(component.toggleUpdateForm).toBeFalse();
    });
  });

  describe('onSubmit', () => {
    it('should update task on submit', () => {
      component.description = 'myDisc';
      component.important = false;
      component.onSubmit();
      expect(component.task.description).toEqual('myDisc');
      expect(component.task.important).toEqual(false);
    });

    it('should invoke  tasksService.updateTask', () => {
      component.onSubmit();
      expect(component.tasksService.updateTask).toHaveBeenCalledWith(
        component.cardId,
        { id: 1, description: undefined, important: false }
      );
    });
    it('should make toggleUpdateForm value false', () => {
      component.onSubmit();
      expect(component.toggleUpdateForm).toBeFalse();
    });
  });
});
