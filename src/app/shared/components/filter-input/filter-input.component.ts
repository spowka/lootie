import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { debounce } from 'lodash';

import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import * as fromRoot from 'src/app/@store';
import * as fromShop from 'src/app/shop/@store';

@Component({
  selector: 'app-filter-input',
  templateUrl: './filter-input.component.html',
  styleUrls: ['./filter-input.component.scss']
})
export class FilterInputComponent implements OnInit {
  @Input() icon: string = "";
  @Input() placeholder: string = "";
  @Input() styles: any = {};
  @Input() value: string = "";
  @Output() valueChange: EventEmitter<string>;

  isLoading$: Observable<boolean>;

  private emitChange = debounce(val => {
    this.valueChange.emit(val);
  }, 700);

  constructor(private store: Store<fromRoot.State>) {
    this.valueChange = new EventEmitter<string>();
    this.isLoading$ = this.store.pipe(select(fromShop.selectLoading));
  }

  ngOnInit() {
  }

  inputChange(ev: any) {
    this.emitChange(ev.target.value);
  }
}
