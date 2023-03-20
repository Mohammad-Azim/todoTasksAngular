import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/Models/card';
import { CardsService } from 'src/app/services/cards/cards.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css'],
})
export class CardListComponent implements OnInit {
  cards: Card[] = [];

  constructor(public cardsService: CardsService) {}

  /**
   * on init will get all card from local storage if MyJson
   * key was found else will get it form json file using cardsService
   */
  ngOnInit() {
    if (localStorage.getItem('MyJson') == null) {
      this.cardsService.getCards().subscribe((val: Card[]) => {
        localStorage.setItem('MyJson', JSON.stringify(val));
        this.cards = val;
      });
    } else {
      this.cards = JSON.parse(localStorage.getItem('MyJson')!);
    }
  }
}
