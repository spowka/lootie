import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { ProductComponent } from './containers/product/product.component';
import { ProductRoutingModule } from './product-routing.module';
import { ProductInfoComponent } from './containers/product-info/product-info.component';
import { ProductBoxComponent } from './components/product-box/product-box.component';
import { ProductVariantsComponent } from './components/product-variants/product-variants.component';
import { ProductView360Component } from './components/product-view-360/product-view-360.component';

@NgModule({
  imports: [
    CommonModule,
    ProductRoutingModule,
    SharedModule
  ],
  declarations: [
    ProductComponent,
    ProductInfoComponent,
    ProductBoxComponent,
    ProductVariantsComponent,
    ProductView360Component
  ]
})

export class ProductModule { }
