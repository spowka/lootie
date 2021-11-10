import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { hexToRgb } from 'src/app/shared/utils/hex-to-rgb';
import { ShopService } from '../../services/shop.service';
import { ItemColor } from '../../models/item-color.model';

@Component({
  selector: 'app-shop-item',
  templateUrl: './shop-item.component.html',
  styleUrls: ['./shop-item.component.scss'],
})
export class ShopItemComponent implements OnInit {
  @Input() item: any;

  @Output() buyShopItem: EventEmitter<any> = new EventEmitter<any>();

  rgb: any = {};

  constructor(
    private shopService: ShopService
    ) {}

  ngOnInit() {
    this.rgb = hexToRgb(this.item.color);
  }

  buy() {
    this.buyShopItem.emit(this.item);
  }

  get gradientStyle() {
    return {
      backgroundImage:
        `linear-gradient(
          to bottom,
          rgba(${this.rgb.r}, ${this.rgb.g}, ${this.rgb.b}, 0),
          rgba(${this.rgb.r}, ${this.rgb.g}, ${this.rgb.b}, 0.15)
        )`
    };
  }
}
