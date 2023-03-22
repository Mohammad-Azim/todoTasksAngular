import { getTestBed, TestBed } from '@angular/core/testing';
import { CardsService } from './cards.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Card } from 'src/app/Models/card';

describe('CardsService', () => {
  let injector: TestBed;
  let service: CardsService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CardsService],
    });
    injector = getTestBed();

    service = injector.get(CardsService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getCards', () => {
    const dummyCards: Card[] = [
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

    it('should return an Observable<Card[]>', () => {
      service.getCards().subscribe((cards) => {
        expect(cards).toEqual(dummyCards);
      });
      const req = httpMock.expectOne('../../../assets/db.json');
      expect(req.cancelled).toBeFalse();
      expect(req.request.responseType).toEqual('json');
      req.flush(dummyCards);
    });
  });
});
