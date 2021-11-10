import { Component, OnInit, ViewChild, ElementRef, Renderer2, OnDestroy, TemplateRef, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { CaseFilters, CaseType, CasesType } from 'src/app/cases/models';
import { Filters, Pagination } from 'src/app/shared/models';
import { CaseModel } from 'src/app/cases/models';

import { select, Store } from '@ngrx/store';
import * as fromRoot from 'src/app/@store';
import * as fromBattle from 'src/app/battle/@store/battle';
import * as fromLayout from 'src/app/@store/layout';
import { Observable, Subject } from 'rxjs';
import { takeUntil, skip, take } from 'rxjs/operators';
import { LayoutService } from 'src/app/@store/services/layout.service';

@Component({
  selector: 'app-dialog-boxes',
  templateUrl: './dialog-boxes.component.html',
  styleUrls: ['./dialog-boxes.component.scss']
})
export class DialogBoxesComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('wrapper', { static: false }) wrapper: ElementRef;

  public platform: string;

  public theme$: Observable<string>;

  public isLoading$: Observable<boolean>;

  public boxes: CaseModel[] = [];

  public selectedBoxes: CaseModel[] = [];

  public selectedBoxesIds: string[] = [];

  public selectedBoxesTotal = 0;

  public isMobile$: Observable<boolean>;

  public pagination: Pagination;
  public filters: Filters;
  public search: string;
  public isScrollDisabled = false;
  public type: CasesType = CaseType.accessories;

  private _boxes$: Observable<CaseModel[]>;

  private _selectedBoxes$: Observable<CaseModel[]>;

  private unsubscribe$: Subject<void> = new Subject();

  static show(dialog: MatDialog): any {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'added-dialog-container';
    dialogConfig.height = 'auto';

    return dialog.open(DialogBoxesComponent, dialogConfig);
  }

  constructor(
    private store: Store<fromRoot.State>,
    private renderer: Renderer2,
    private fromLayoutService: LayoutService,
    public dialogRef: MatDialogRef<DialogBoxesComponent>
  ) {
    this._boxes$ = this.store.pipe(select(fromBattle.selectBoxes));
    this._selectedBoxes$ = this.store.pipe(select(fromBattle.selectSelectedBoxes));
    this.isLoading$ = this.store.pipe(select(fromBattle.selectLoading));

    this.platform = this.fromLayoutService.getBrowserName();
    this.isMobile$ = this.store.pipe(select(fromLayout.selectIsMobile));

    this.pagination = { limit: 15, offset: 0 };
    this.filters = { orderBy: 'price', orderDir: 'desc' };

    this._selectedBoxes$.pipe(take(1)).subscribe(boxes => boxes.map(box => this.addToSelectedItems(box)));
    this._boxes$.pipe(skip(1), takeUntil(this.unsubscribe$)).subscribe(boxes => {
      boxes.map((box) => {
        this.boxes = this.boxes.filter(_box => box._id !== _box._id);
        this.boxes.push(box);
      });

      this.boxes.some(box => {
        if (!this.selectedBoxesIds.includes(box._id)) {
          return true;
        }
      });

      this.isScrollDisabled = false;
    });
  }

  ngOnInit() {
    this.loadBattleBoxes();
  }

  ngAfterViewInit() {
    this.subscribeToThemeChange();
  }

  addToSelectedItems(box: CaseModel): void {
    this.selectedBoxes = [...this.selectedBoxes, box];
    this.selectedBoxesIds = [...this.selectedBoxesIds, box._id];
    this.selectedBoxesTotal = +(this.selectedBoxesTotal + box.price).toFixed(3);
  }

  removeFromSelectedItems(box: CaseModel): void {
    this.selectedBoxes = this.selectedBoxes.filter(_box => _box._id !== box._id);
    this.selectedBoxesIds = this.selectedBoxesIds.filter(id => id !== box._id);
    this.selectedBoxesTotal = +(this.selectedBoxesTotal - box.price).toFixed(3);
  }

  onFiltersChange(filter: CaseFilters): void {
    if (filter.sort) {
      this.filters = { orderBy: 'price', orderDir: filter.sort === 'Low' ? 'asc' : 'desc' };
    }

    if (filter.search !== undefined) {
      this.search = filter.search;
    }

    if (filter.type) {
      this.type = filter.type as CasesType;
    }

    this.pagination = { limit: 15, offset: 0 };
    this.boxes = [];
    this.isScrollDisabled = true;
    this.loadBattleBoxes();
  }

  subscribeToThemeChange() {
    this.theme$ = this.store.pipe(select(fromRoot.selectTheme));

    this.theme$.pipe(takeUntil(this.unsubscribe$))
      .subscribe((theme: string) => {
        if (this.wrapper.nativeElement.classList.contains('dialog-wrapper__dark')) {
          this.renderer.removeClass(this.wrapper.nativeElement, 'dialog-wrapper__dark');
        }
        if (this.wrapper.nativeElement.classList.contains('dialog-wrapper__light')) {
          this.renderer.removeClass(this.wrapper.nativeElement, 'dialog-wrapper__light');
        }
        if (theme === 'light') {
          this.renderer.addClass(this.wrapper.nativeElement, 'dialog-wrapper__light');
          return;
        }
        this.renderer.addClass(this.wrapper.nativeElement, 'dialog-wrapper__dark');
      });
  }

  onScroll() {
    this.pagination = { limit: this.pagination.limit, offset: this.pagination.offset + 1 };

    this.loadBattleBoxes();
  }

  loadBattleBoxes(): void {
    this.store.dispatch(new fromBattle.LoadBoxes({
      caseType: this.type,
      pagination: this.pagination,
      name: this.search,
      filters: this.filters
    }));
  }

  close() {
    this.dialogRef.close();
  }

  done() {
    this.store.dispatch(new fromBattle.SelectBoxes(this.selectedBoxes));
    this.close();
  }

  ngOnDestroy() {
    this.store.dispatch(new fromBattle.CloseBattleBoxModal());
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
