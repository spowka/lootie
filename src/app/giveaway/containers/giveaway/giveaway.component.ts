import { Component, OnInit } from '@angular/core';
import { NgxZendeskWebwidgetService } from 'ngx-zendesk-webwidget';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-giveaway',
  templateUrl: './giveaway.component.html',
  styleUrls: ['./giveaway.component.scss']
})
export class GiveawayComponent implements OnInit {

  constructor(private _ngxZendeskWebwidgetService: NgxZendeskWebwidgetService, private titleService: Title) {
    this.titleService.setTitle('Giveaway | Lootie');
  }

  ngOnInit() {
  }

  onToggleZendesk() {
    this._ngxZendeskWebwidgetService.zE('webWidget', 'open');
  }

}
