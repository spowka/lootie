import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-available-page',
  templateUrl: './not-available-page.component.html',
  styleUrls: ['./not-available-page.component.scss'],
})
export class NotAvailablePageComponent implements OnInit {

  constructor() {
    localStorage.setItem('unavailableUser', 'true');
  }

  ngOnInit() {
    document.body.className += ' hide-help-btn';
  }
}
