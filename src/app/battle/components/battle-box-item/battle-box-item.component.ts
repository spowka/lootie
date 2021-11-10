import { Component, OnInit, Input } from '@angular/core';
import { SiteItemsModel } from 'src/app/shared/models';
import { trigger, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-battle-box-item',
  templateUrl: './battle-box-item.component.html',
  styleUrls: ['./battle-box-item.component.scss'],
  animations: [
    trigger('fadeUp', [
      transition(':enter', [
        style({ opacity: 1 }),
        animate('500ms', style({ opacity: 0, transform: 'translateY(-45px) scale(1.5)' }))
      ]),
    ]),
  ]
})
export class BattleBoxItemComponent implements OnInit {
  @Input() item: SiteItemsModel;
  @Input() animate: boolean;

  constructor() {
  }

  ngOnInit() {
  }
}
