import { Component, OnInit } from '@angular/core';
import { NgxZendeskWebwidgetService } from 'ngx-zendesk-webwidget';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  constructor(private _ngxZendeskWebwidgetService: NgxZendeskWebwidgetService, private titleService: Title) {
    this.titleService.setTitle('Contact | Lootie');
  }

  ngOnInit() {
  }

  onToggleZendesk() {
    this._ngxZendeskWebwidgetService.zE('webWidget', 'open');
  }

}
