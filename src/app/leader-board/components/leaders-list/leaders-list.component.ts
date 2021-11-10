import { Component, OnInit, Input } from '@angular/core';
import { LeaderBoardModel } from 'src/app/shared/models';

@Component({
  selector: 'app-leaders-list',
  templateUrl: './leaders-list.component.html',
  styleUrls: ['./leaders-list.component.scss'],
})
export class LeadersListComponent implements OnInit {
  @Input() items: LeaderBoardModel;

  constructor() {}

  ngOnInit() {}
}
