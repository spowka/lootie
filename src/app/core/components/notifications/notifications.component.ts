import { Component, OnInit } from '@angular/core';
import { Toast, ToastrService, ToastPackage } from 'ngx-toastr';

import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';


@Component({
  selector: '[app-notifications-component]',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('inactive', style({
        opacity: 0,
      })),
      transition('inactive => active', animate('400ms ease-out', keyframes([
        style({
          transform: 'translate3d(100%, 0, 0) skewX(-30deg)',
          opacity: 0,
        }),
        style({
          transform: 'skewX(20deg)',
          opacity: 1,
        }),
        style({
          transform: 'skewX(-5deg)',
          opacity: 1,
        }),
        style({
          transform: 'none',
          opacity: 1,
        }),
      ]))),
      transition('active => removed', animate('400ms ease-out', keyframes([
        style({
          opacity: 1,
        }),
        style({
          transform: 'translate3d(100%, 0, 0) skewX(30deg)',
          opacity: 0,
        }),
      ]))),
    ])
  ]
})
export class NotificationsComponent extends Toast implements OnInit {
  public toastTypes;

  constructor(protected toastrService: ToastrService, public toastPackage: ToastPackage) {
    super(toastrService, toastPackage);
    this.toastTypes = {
      error: 'toast-error-custom',
      info: 'toast-info-custom',
      success: 'toast-success-custom',
      warning: 'toast-default-custom'
    };
  }

  ngOnInit() {
  }

  close(ev: any) {
    ev.stopPropagation();
    this.toastrService.clear(this.toastPackage.toastId);
    return false;
  }

}
