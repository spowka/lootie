import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html',
  styleUrls: ['./product-box.component.scss']
})
export class ProductBoxComponent implements OnInit {
  public boxItems = [
    {
      name: 'Adidas Box',
      price: '59.00'
    },
    {
      name: 'Amazon Box',
      price: '22.00'
    },
    {
      name: 'Bape Box',
      price: '85.00'
    },
    {
      name: 'Kith Box',
      price: '14.00'
    }
  ];

  constructor() { }

  ngOnInit() {}
}
