// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { FormsModule } from '@angular/forms';
// import { MatIconModule } from '@angular/material/icon';
// import { TasksService } from 'src/app/services/tasks/tasks.service';
// import { TaskComponent } from '../task/task.component';
// import { CardComponent } from './card.component';

// describe('CardComponent', () => {
//   let component: CardComponent;
//   let fixture: ComponentFixture<CardComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [CardComponent, TaskComponent],
//       providers: [TasksService],
//       imports: [FormsModule, MatIconModule],
//     }).compileComponents();

//     fixture = TestBed.createComponent(CardComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
import Spy = jasmine.Spy;
import { of } from 'rxjs';
import { TasksServiceMock } from 'src/app/services/tasks/mock.tasks.service';
import { CardComponent } from './card.component';

fdescribe('CardComponent', () => {
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
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ToggleAddTaskFrom', () => {
    it('ToggleTaskFrom initial value will be false', () => {
      console.log(component.ToggleTaskForm);
      expect(component.ToggleTaskForm).toBeFalse();
    });

    it('ToggleTaskFrom after toggle it will be true', () => {
      component.ToggleAddTaskFrom();
      expect(component.ToggleTaskForm).toBeTrue();
      component.ToggleTaskForm = false;
    });
  });

  describe('deleteOneTask', () => {
    it('deleteOneTask will remove one task', () => {
      component.deleteOneTask(2);
      expect(component.card.tasks.length).toEqual(3);
    });
  });

  describe('onSubmitTask', () => {
    it('should add one task to the card', () => {
      component.onSubmitTask();
      expect(component.card.tasks.length).toEqual(5);
      expect(component.ToggleTaskForm).toBeFalse();
    });
  });
});
