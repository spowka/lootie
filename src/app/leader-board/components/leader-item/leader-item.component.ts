import { Component, OnInit, Input } from '@angular/core';
import { LeaderBoardDataItem } from 'src/app/shared/models';

@Component({
  selector: 'app-leader-item',
  templateUrl: './leader-item.component.html',
  styleUrls: ['./leader-item.component.scss'],
})
export class LeaderItemComponent implements OnInit {
  @Input() leaderItem: LeaderBoardDataItem;

  constructor() {}

  ngOnInit() {}
}
