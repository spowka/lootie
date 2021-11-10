import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';

import { SiteItemsModel } from 'src/app/shared/models';

@Component({
  selector: 'app-item-info',
  templateUrl: './item-info.component.html',
  styleUrls: ['./item-info.component.scss']
})
export class ItemInfoComponent implements OnInit {

  @Input() item: SiteItemsModel;
  @Input() items: SiteItemsModel[];
  @Input() showPrice = true;
  @Input() withDeleteOption = false;
  @Input() currencyCode = false;
  @Input() withGlowEffect = false;

  @Output() delete: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  deleteItem(): void {
    this.delete.emit(this.item);
  }

}
