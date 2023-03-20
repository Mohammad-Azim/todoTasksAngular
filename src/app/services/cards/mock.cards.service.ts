import { HttpClient } from '@angular/common/http';
import { CardsService } from './cards.service';

export const CardsServiceMock = (): CardsService => {
  return {
    http: null as unknown as HttpClient,
    getCards: jasmine.createSpy('getCards'),
  };
};
