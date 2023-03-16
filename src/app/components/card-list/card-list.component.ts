import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Card } from 'src/app/Models/card';
import { CardsService } from 'src/app/services/cards/cards.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css'],
})
export class CardListComponent implements OnInit {
  cards?: Card[];
  private unsubscribe = new Subject<void>();

  constructor(private cardsService: CardsService) {}

  async ngOnInit() {
    this.cardsService
      .getCards()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((val: any) => {
        this.cards = val;
      });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
