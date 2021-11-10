import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-variants',
  templateUrl: './product-variants.component.html',
  styleUrls: ['./product-variants.component.scss']
})
export class ProductVariantsComponent implements OnInit {

  public variants = [
    {
      size: 'US 6',
      isHave: false,
      price: null
    },
    {
      size: 'US 6.5',
      isHave: true,
      price: 893
    },
    {
      size: 'US 7',
      isHave: true,
      price: 893
    },
    {
      size: 'US 7.5',
      isHave: true,
      price: 893
    },
    {
      size: 'US 8',
      isHave: true,
      price: 893
    },
    {
      size: 'US 8.5',
      isHave: true,
      price: 893
    },
    {
      size: 'US 9',
      isHave: false,
      price: null
    },
    {
      size: 'US 9.5',
      isHave: true,
      price: 893
    },
    {
      size: 'US 10',
      isHave: false,
      price: null
    },
    {
      size: 'US 10.5',
      isHave: false,
      price: null
    },
    {
      size: 'US 11',
      isHave: true,
      price: 893
    },
    {
      size: 'US 11.5',
      isHave: true,
      price: 893
    },
    {
      size: 'US 12',
      isHave: true,
      price: 893
    },
    {
      size: 'US 12.5',
      isHave: false,
      price: null
    }
  ];

  constructor() { }

  ngOnInit() { }
}
