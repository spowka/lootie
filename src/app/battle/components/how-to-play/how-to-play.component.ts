import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromRoot from 'src/app/@store';
import * as fromRouter from 'src/app/@store/router';

@Component({
  selector: 'app-how-to-play',
  templateUrl: './how-to-play.component.html',
  styleUrls: ['./how-to-play.component.scss']
})
export class HowToPlayComponent implements OnInit {
  public howToCreateBattle = {
    title: 'HOW_TO_PLAY.CREATE_BATTLE_TITLE',
    items: [
      'HOW_TO_PLAY.CREATE_BATTLE_FIRST_STEP',
      'HOW_TO_PLAY.CREATE_BATTLE_SECOND_STEP',
      'HOW_TO_PLAY.CREATE_BATTLE_THIRD_STEP',
      'HOW_TO_PLAY.CREATE_BATTLE_FOURTH_STEP',
      'HOW_TO_PLAY.CREATE_BATTLE_FIFTH_STEP',
      'HOW_TO_PLAY.CREATE_BATTLE_SIXTH_STEP',
      'HOW_TO_PLAY.CREATE_BATTLE_SEVENTH_STEP'
    ]
  };

  public howToWinnerChosen = {
    title: 'HOW_TO_PLAY.WINNER_CHOSEN_TITLE',
    items: [
      'HOW_TO_PLAY.WINNER_CHOSEN_DESCRIPTION',
    ]
  };

  public qaItems = [
    {
      title: 'HOW_TO_PLAY.QA_FIRST_ITEM_TITLE',
      description: 'HOW_TO_PLAY.QA_FIRST_ITEM_DESCRIPTION'
    },
    {
      title: 'HOW_TO_PLAY.QA_SECOND_ITEM_TITLE',
      description: 'HOW_TO_PLAY.QA_SECOND_ITEM_DESCRIPTION'
    },
    {
      title: 'HOW_TO_PLAY.QA_THIRD_ITEM_TITLE',
      description: 'HOW_TO_PLAY.QA_THIRD_ITEM_DESCRIPTION'
    },
    {
      title: 'HOW_TO_PLAY.QA_FOURTH_ITEM_TITLE',
      description: 'HOW_TO_PLAY.QA_FOURTH_ITEM_DESCRIPTION'
    },
  ];

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {}

  goBack() {
    this.store.dispatch(new fromRouter.Back());
  }
}
