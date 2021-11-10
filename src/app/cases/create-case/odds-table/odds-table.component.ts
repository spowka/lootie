import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs';

import * as fromRoot from 'src/app/@store';
import * as fromLayout from 'src/app/@store/layout';
import * as fromCases from 'src/app/cases/@store';

@Component({
  selector: 'app-odds-table',
  templateUrl: './odds-table.component.html',
  styleUrls: ['./odds-table.component.scss']
})
export class OddsTableComponent implements OnInit {

  @Input() items: any[];

  @Output() changeOdd: EventEmitter<any> = new EventEmitter();

  @Output() deleteOdd: EventEmitter<any> = new EventEmitter();

  public theme$: Observable<string>;

  public headerItems = ['category', 'item', 'item price', 'case price', 'odds', ''];

  public itemsPrices: any;

  public lastId: string;

  public isMobile$: Observable<boolean>;

  public isLoading$: Observable<boolean>;

  private _itemsPrices$: Observable<any[]>;

  constructor(private store: Store<fromRoot.State>) {
    this._itemsPrices$ = this.store.pipe(select(fromCases.selectCasesPrices));
    this.isMobile$ = this.store.pipe(select(fromLayout.selectIsMobile));
    this.isLoading$ = this.store.pipe(select(fromCases.selectOddTableLoading));
    this.theme$ = this.store.pipe(select(fromRoot.selectTheme));

    this._itemsPrices$.subscribe((prices) => {
      this.itemsPrices = prices.reduce((obj, item) => {
        obj[item.id] = item;
        return obj;
      }, {});
    });
  }

  ngOnInit() { }

  onChangeOdd(id: string, odd: number): void {
    if (odd < 0) {
      odd = 0;
    }

    if (odd > 100) {
      odd = 100;
    }

    this.lastId = id;
    this.changeOdd.emit({ id, odd });
  }

  onDeleteOdd(id: string, odd: number): void {
    this.deleteOdd.emit({ id, odd });
  }

}
