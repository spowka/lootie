import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { FormControl, AbstractControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';

import { modalAnimation } from 'src/app/shared/utils/animations';
import { Filters } from 'src/app/shared/models/index';
import { CaseFilters, CasesType } from 'src/app/cases/models/index';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import * as fromRoot from 'src/app/@store';
import * as fromLayout from 'src/app/@store/layout';
import * as fromHistory from 'src/app/@store/history';
import { MatSelect } from '@angular/material';

export function ValidateRegEx(control: AbstractControl) {
  try {
    RegExp(control.value);
  } catch (e) {
    return { validRegEx: false };
  }

  return null;
}

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
  animations: [modalAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersComponent implements OnInit, OnDestroy {
  @ViewChild(MatSelect, { static: false }) matSelect: MatSelect;

  @Input() filters: CaseFilters;
  @Input() fullViewMode = true;
  @Input() showTagSearch = false;
  @Input() showTypeSearch = false;
  @Input() showSelected = true;
  @Input() isCreateCase = false;
  @Input() showSelectAll = false;
  @Input() selectedCount = 0;
  @Input() isSelectAllSelected = false;
  @Input() isNoData = false;

  @Output() filtersChange: EventEmitter<Filters | CaseFilters> = new EventEmitter();
  @Output() selectAll: EventEmitter<boolean> = new EventEmitter();

  public isMobile$: Observable<boolean>;

  public searchControl: FormControl;
  public tagSearchControl: FormControl;
  public sortControl: FormControl;
  public typeControl: FormControl;

  public priceFilters = ['Low', 'High'];

  public tagFilters: string[] = [];

  public caseTypes: CasesType[] = [
    'OFFICIAL',
    'DAILY',
    'STREETWEAR',
    'ELECTRONICS',
    'ACCESSORIES',
    'TOP 100',
    'NEW CASE',
    'FREE',
  ];

  public selectedPriceFilter = 'High';

  public selectedTagFilter = 'All';

  public selectedType = 'OFFICIAL';

  private unsubscribe$: Subject<void> = new Subject();

  public tags$: Observable<any>;

  constructor(private store: Store<fromRoot.State>) {
    this.isMobile$ = this.store.pipe(select(fromLayout.selectIsMobile));
    this.store.dispatch(new fromHistory.LoadTags());
    this.tags$ = this.store.pipe(select(fromHistory.selectTags));

    this.tags$.pipe(takeUntil(this.unsubscribe$)).subscribe((tag) => {
      this.tagFilters = tag;
    });
  }

  ngOnInit() {
    this.initSearch();
    this.initTagSearch();
    this.initSort();
    this.initTypeSearch();
  }

  openedChange(isOpen: boolean): void {
    if (isOpen) {
      return this.store.dispatch(new fromLayout.DisableLayoutScroll());
    }

    this.store.dispatch(new fromLayout.EnableLayoutScroll());
  }

  clear() {
    setTimeout((_) => {
      this.searchControl.setValue('');
    }, 500);
  }

  public onSelectAll(checkbox): void {
    this.selectAll.emit(checkbox.checked);
  }

  private initSearch() {
    this.searchControl = new FormControl(this.filters && this.filters.search, ValidateRegEx);

    this.searchControl.valueChanges.pipe(debounceTime(700)).subscribe((value) => {
      if (this.searchControl.invalid) {
        return;
      }

      this.filtersChange.emit({ search: value });
    });
  }

  private initTagSearch() {
    this.tagSearchControl = new FormControl(
      (this.filters && this.filters.tag) || this.selectedTagFilter
    );

    this.tagSearchControl.valueChanges.subscribe((value) => {
      this.filtersChange.emit({ tag: value });
    });
  }

  private initSort() {
    this.sortControl = new FormControl(
      (this.filters && this.filters.sort) || this.selectedPriceFilter
    );

    this.sortControl.valueChanges.subscribe((value) => {
      this.filtersChange.emit({ sort: value });
    });
  }

  private initTypeSearch() {
    this.typeControl = new FormControl((this.filters && this.filters.type) || this.selectedType);

    this.typeControl.valueChanges.subscribe((value) => {
      this.filtersChange.emit({ type: value });
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
