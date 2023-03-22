import { CardsServiceMock } from 'src/app/services/cards/mock.cards.service';
import Spy = jasmine.Spy;
import { CardListComponent } from './card-list.component';
import { of } from 'rxjs';
import { Card } from 'src/app/Models/card';

describe('CardListComponent', () => {
  let component = new CardListComponent(CardsServiceMock());

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    const cards: Card[] = [
      { id: 1, name: 'Card 1', tasks: [] },
      { id: 2, name: 'Card 2', tasks: [] },
      { id: 3, name: 'Card 3', tasks: [] },
    ];

    it('check component.cards when local storage have cards', () => {
      localStorage.setItem('MyJson', JSON.stringify(cards));
      component.ngOnInit();

      expect(component.cards.length).toEqual(3);
    });

    it('check component.cards when local storage is empty', () => {
      localStorage.removeItem('MyJson');
      (component.cardsService.getCards as Spy).and.returnValue(of(cards));
      component.ngOnInit();

      expect(component.cards.length).toEqual(3);
    });
  });
});
