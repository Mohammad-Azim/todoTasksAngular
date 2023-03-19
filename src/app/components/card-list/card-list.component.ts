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
    if (localStorage.getItem('MyJson') == null) {
      this.cardsService
        .getCards()
        .pipe(takeUntil(this.unsubscribe))
        .subscribe((val: any) => {
          localStorage.setItem('MyJson', JSON.stringify(val));
          this.cards = val;
        });
    } else {
      this.cards = JSON.parse(localStorage.getItem('MyJson')!);
    }
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
