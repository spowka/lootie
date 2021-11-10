import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, Renderer2, ViewChild, ViewChildren} from '@angular/core';
import {MatDialog} from '@angular/material';
import {Router} from '@angular/router';
import * as $ from 'jquery';

import {select, Store} from '@ngrx/store';
import {Observable, Subject} from 'rxjs';
import * as fromRoot from 'src/app/@store';
import * as fromAuthSelector from 'src/app/auth/@store/auth/auth.selector';
import * as fromCases from 'src/app/cases/@store';

import {CaseModel, CaseType} from 'src/app/cases/models';
import {map, take, takeUntil} from 'rxjs/operators';

import {DialogUnboxComponent} from '../dialog-unbox/dialog-unbox.component';
import {Filters, Pagination} from 'src/app/shared/models';
import {User} from 'src/app/auth/models';
import {Title} from '@angular/platform-browser';
import {DragEvent, DraggableDirective, DragStartEvent, DropEvent} from '../../../shared/directives/draggable/draggable.directive';

@Component({
  selector: 'app-cases-list',
  templateUrl: './cases-list.component.html',
  styleUrls: ['./cases-list.component.scss']
})
export class CasesListComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('dndPlaceholderRef', {static: true}) dndPlaceholderRef: ElementRef;
  @ViewChildren(DraggableDirective, {read: ElementRef}) casesListRef: QueryList<ElementRef<HTMLElement>>;

  public isAdmin$: Observable<boolean>;

  public cases: CaseModel[] = [];
  public allFilteredCases: CaseModel[] = [];

  public isUnboxModalOpened$: Observable<boolean>;

  public search$: Observable<string>;

  public loaded$: Observable<boolean>;

  public loading$: Observable<boolean>;

  public pagination: Pagination;

  public total: number;

  public search: string;

  public backHistory: any;

  public cases$: Observable<CaseModel[]>;

  dragging = false;

  // DND properties used for placeholder position calculation
  dndBeginX = 0;
  dndBeginY = 0;
  dndWidth = 0;
  dndHeight = 0;

  // Initial index of dragging element
  dndBeginIndex = 0;

  // Left offset of the elements in grid - it is calculated on start by first element rect.left
  offsetLeft = 0;

  // Current index of dragging element (during drag)
  dndIndex = 0;

  private _backHistory$: Observable<any>;

  private unsubscribe$: Subject<void> = new Subject();

  private unboxingItem: CaseModel;

  private filters: Filters;

  private itemsPerRow = 7;

  private caseType: CaseType;

  constructor(
    private store: Store<fromRoot.State>,
    public dialog: MatDialog,
    public router: Router,
    private titleService: Title,
    private elRef: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) {
    this.isAdmin$ = this.store.pipe(
      select(fromAuthSelector.selectUser),
      map((user: User) => !!user && user.type === 'ADMIN')
    );

    this.isUnboxModalOpened$ = this.store.pipe(
      select(fromCases.selectUnboxModalOpened)
    );
    this.loaded$ = this.store.pipe(select(fromCases.selectLoaded));
    this.loading$ = this.store.pipe(select(fromCases.selectLoading));
    this.pagination = {limit: 35, offset: 0};
    this.itemsPerRow = 7;

    this.titleService.setTitle(
      'Lootie.com: Open Mystery Boxes | Unbox Authentic Products | Provably fair odds'
    );

    this.store.pipe(
      takeUntil(this.unsubscribe$),
      select(fromRoot.selectWindowSize),
    ).subscribe((size: any) => {
      if (size.width <= 767) {
        this.itemsPerRow = 2;
        this.pagination.limit = 10;
      } else {
        this.itemsPerRow = Math.floor((size.width - 4) / 240);
        this.pagination.limit = this.itemsPerRow * 5;
      }

      this.truncateItems();
    });

    this.store.pipe(
      takeUntil(this.unsubscribe$),
      select(fromCases.selectSearch)
    ).subscribe((search) => {
      this.pagination.offset = 0;
      if (this.search !== undefined) {
        this.search = search;
        this.loadCases();
      } else {
        this.search = search;
      }
    });

    this.store.pipe(
      takeUntil(this.unsubscribe$),
      select(fromCases.selectCases)
    ).subscribe(({cases, caseType, total}) => {
      this.allFilteredCases = cases;
      this.total = total;
      this.truncateItems();

      if (this.caseType !== caseType) {
        this.caseType = caseType;
        this.pagination.offset = Math.floor(
          this.cases.length / this.pagination.limit
        );

        this.loadCases();
      }

    });

    this.store.pipe(
      select(fromCases.selectBackHistory),
      take(1),
    ).subscribe(history => {
      this.backHistory = history;
    });

    this.isUnboxModalOpened$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(opened => {
        if (opened) {
          const dialogRef = DialogUnboxComponent.show(
            this.dialog,
            this.unboxingItem
          );
        }
      });
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    if (this.backHistory && this.backHistory.scrollHeight) {
      setTimeout(() => {
        $(this.elRef.nativeElement)
          .closest('main.theme')
          .scrollTop(this.backHistory.scrollHeight);
      }, 100);
    }
  }

  onLoad() {
    this.pagination = {
      limit: this.pagination.limit,
      offset: this.pagination.offset + 1
    };

    this.loadCases();
  }

  loadCases() {
    if (this.caseType === CaseType.new) {
      this.filters = {
        orderBy: 'createdAt',
        orderDir: 'desc'
      };
    } else {
      this.filters = {
        orderBy: 'name',
        orderDir: 'asc'
      };
    }

    this.store.dispatch(
      new fromCases.LoadCases({
        caseType: this.caseType,
        pagination: {...this.pagination},
        name: this.search,
        filters: this.filters
      })
    );
  }

  unboxCase(item: CaseModel): void {
    this.store.dispatch(
      new fromCases.SetBackHistory({
        caseType: this.caseType,
        pagination: {
          limit: this.pagination.limit * (this.pagination.offset + 1),
          offset: 0
        },
        scrollHeight: $(this.elRef.nativeElement)
          .closest('main.theme')
          .scrollTop()
      })
    );

    this.router.navigate(['mysterybox/unbox', item.slug || item._id]);
    this.unboxingItem = item;
  }

  editCase(id: string) {
    this.router.navigate(['mysterybox/edit', id]);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getItemId(item: CaseModel) {
    return item._id;
  }

  private truncateItems() {
    if (this.allFilteredCases.length === this.total) {
      this.cases = this.allFilteredCases;
    } else {
      const m = this.allFilteredCases.length % this.itemsPerRow;
      this.cases = this.allFilteredCases.slice(0, this.allFilteredCases.length - m);
    }
  }

  private updatePlaceholderPosition(index: number) {
    this.changeCaseElemPosition(this.dndPlaceholderRef.nativeElement, index);
  }

  private changeCaseElemPosition(caseElem: HTMLElement, index: number) {
    if (this.dndBeginIndex > this.dndIndex) {
      index--;
    }

    const elemRef = index > this.casesListRef.length - 2 ? this.casesListRef.last :
      this.casesListRef.find((e, i) => i === index + 1);

    const elem = elemRef.nativeElement;

    if (index > this.casesListRef.length - 1) {
      elem.parentElement.appendChild(caseElem);
    } else {
      elem.parentElement.insertBefore(caseElem, elem);
    }
  }

  onDrop(evt: DropEvent) {
    this.dragging = false;
    const element = evt.element;

    this.renderer.setStyle(element, 'top', '0px');
    this.renderer.setStyle(element, 'left', '0px');
    this.renderer.setStyle(element, 'position', 'relative');
    this.renderer.setStyle(element, 'transform', 'none');

    const newCases = [...this.cases];
    const caseObj = newCases.splice(this.dndBeginIndex, 1)[0];

    newCases.splice(this.dndIndex, 0, caseObj);
    this.cases = newCases;

    evt.reset();
  }

  onDragStart(evt: DragStartEvent) {
    const {element} = evt;
    const rect = element.getBoundingClientRect();
    const mainRect = this.elRef.nativeElement.getBoundingClientRect();

    this.dndBeginX = rect.left;
    this.dndBeginY = rect.top - mainRect.top;
    this.dndWidth = rect.width;
    this.dndHeight = rect.height;
    this.offsetLeft = this.casesListRef.first.nativeElement.getBoundingClientRect().left;

    this.dndBeginIndex = this.coordsToIndex(this.dndBeginX, this.dndBeginY);

    this.updatePlaceholderPosition(this.dndBeginIndex);

    this.renderer.setStyle(element, 'top', this.dndBeginY + 'px');
    this.renderer.setStyle(element, 'left', this.dndBeginX + 'px');
    this.renderer.setStyle(element, 'position', 'absolute');

    this.dragging = true;
  }

  onDrag(evt: DragEvent) {
    const index = this.coordsToIndex(this.dndBeginX + evt.x, this.dndBeginY + evt.y);
    if (index !== this.dndIndex) {
      this.dndIndex = index;
      this.updatePlaceholderPosition(index);
    }
  }

  /**
   * Based on left/top offset calculated index of the element in grid
   */
  coordsToIndex(left: number, top: number) {
    // 20 - is margin
    // this.offsetLeft - offset of the elements in grid from left side (depends on widow side it could be different inner grid is centered)
    return Math.floor(Math.max(top + (this.dndHeight - 20) / 2, 0) / this.dndHeight) * this.itemsPerRow +
      Math.floor(Math.max((left - this.offsetLeft + (this.dndWidth - 20) / 2) / this.dndWidth, 0));
  }
}
