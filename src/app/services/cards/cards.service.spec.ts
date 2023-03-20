import { TestBed } from '@angular/core/testing';
import { CardsService } from './cards.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CardsService', () => {
  let service: CardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(CardsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
