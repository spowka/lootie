import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable, Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { MatOptionSelectionChange } from '@angular/material';

import { Store, select } from '@ngrx/store';
import { takeUntil, skip, take } from 'rxjs/operators';

import * as fromRoot from 'src/app/@store';
import * as fromCases from 'src/app/cases/@store';
import * as fromLayout from 'src/app/@store/layout';
import * as fromRouter from 'src/app/@store/router';

import { SiteItemsModel, Pagination, Filters } from 'src/app/shared/models';
import { CaseFilters, CaseModel, CaseType, CasesType } from 'src/app/cases/models';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxZendeskWebwidgetService } from 'ngx-zendesk-webwidget';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { sumBy } from 'lodash';

@Component({
  selector: 'app-create-case',
  templateUrl: './create-case.component.html',
  styleUrls: ['./create-case.component.scss']
})
export class CreateCaseComponent implements OnInit, OnDestroy {
  public theme$: Observable<string>;

  public isChatOpened$: Observable<boolean>;

  public isLoaded$: Observable<boolean>;

  public isMobile$: Observable<boolean>;

  currentUrl$: Observable<string>;

  public isEdit: boolean;

  public caseId: string;

  public editCase$: Observable<CaseModel>;

  public caseTypes: CasesType[] = ['OFFICIAL', 'DAILY', 'STREETWEAR', 'ELECTRONICS', 'ACCESSORIES', 'TOP 100', 'NEW CASE', 'FREE'];

  public selectedTypes: CasesType[];

  public caseNameString = '';

  public badgeLabel = '';

  public salePercent = 0;

  public affiliateCut = 0;

  public price: number;

  public houseEdge: number;

  public siteItems: any[] = [];
  public selectedItems: any[] = [];
  public selectedItemsIds: string[] = [];

  public caseLogos: any[] = [];
  public selectedLogo: string;

  public totalOdds = 0;
  public casePrice$: Observable<number>;

  public pagination: Pagination;
  public filters: Filters;
  public search: string;
  public tag: string;
  public isScrollDisabled = false;

  private caseLogos$: Observable<string[]>;
  private siteItems$: Observable<SiteItemsModel[]>;

  private unsubscribe$: Subject<void> = new Subject();

  private readonly colors = ['#bab4b4', '#19bd66', '#9d63d2', '#4fc1e3', '#f3893a', '#f34747'];

  constructor(
    private store: Store<fromRoot.State>,
    private toast: ToastrService,
    private titleService: Title,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private _ngxZendeskWebwidgetService: NgxZendeskWebwidgetService,
    private router: Router,
  ) {
    this.isChatOpened$ = this.store.pipe(select(fromLayout.selectChatOpened));
    this.isLoaded$ = this.store.pipe(select(fromCases.selectLoaded));
    this.casePrice$ = this.store.pipe(select(fromCases.selectCasePrice));
    this.caseLogos$ = this.store.pipe(select(fromCases.selectCaseLogos));
    this.siteItems$ = this.store.pipe(select(fromCases.selectSiteItems));
    this.isMobile$ = this.store.pipe(select(fromLayout.selectIsMobile));
    this.currentUrl$ = this.store.pipe(select(fromRoot.selectgetActiveUrl));
    this.theme$ = this.store.pipe(select(fromRoot.selectTheme));

    this.titleService.setTitle('Create Your Own Box | Open Mystery Boxes at Lootie');

    this.isEdit = this.router.url.includes('/mysterybox/edit');

    this.pagination = { limit: 40, offset: 0 };

    const width = window.innerWidth;
    if (width <= 1367 && width > 1237) {
      this.pagination.limit = 35;
    } else if (width <= 1237 && width > 1067) {
      this.pagination.limit = 30;
    } else if (width <= 1067 && width > 897) {
      this.pagination.limit = 25;
    } else if (width <= 897) {
      this.pagination.limit = 20;
    }

    this.filters = { orderBy: 'value', orderDir: 'desc' };

    this.loadSiteItems();

    this.store.dispatch(new fromCases.LoadCaseLogos);
  }

  ngOnInit() {
    this.initCases();
    this.initItems();
    if (this.isEdit) {
      this.initEditCase();
    }
  }

  public goBack(): void {
    this.store.dispatch(new fromRouter.Back());
  }

  public inputChange() {
    this.caseNameString = this.caseNameString.substr(0, 50);
  }

  clear() {
    this.caseNameString = '';
  }

  formatLabel(value: number | null) {
    if (value === null) {
      return 0;
    }

    return `${value}%`;
  }

  public loadSiteItems(): void {
    this.store.dispatch(new fromCases.LoadSiteItems({
      pagination: this.pagination,
      filters: this.filters,
      search: this.search,
      tag: this.tag !== 'All' ? this.tag : undefined,
    }));
  }

  public addToSelectedCases(item): void {
    this.selectedLogo = item.image;
  }

  public removeFromSelectedCases(item): void {
    this.selectedLogo = '';
  }

  public addToSelectedItems(item): void {
    item.odd = 0;

    if (this.selectedItems.find(selectedItem => selectedItem.odd === 100)) {
      this.store.dispatch(new fromCases.ResetCasePrice());
      if (!this.toast.currentlyActive) {
        this.translate.get('CREATE_CASE.ZERO_ODD').subscribe((res: string) => {
          this.toast.error(res);
        });
      }
    }

    this.selectedItemsIds.push(item._id);
    this.selectedItems.push(item);
  }

  public removeFromSelectedItems(item): void {
    this.onDeleteOdd({ id: item._id, odd: item.odd });
  }

  public createCase(): void {
    if (this.caseNameString && this.caseNameString.trim() === '') {
      if (!this.toast.currentlyActive) {
        this.translate.get('CREATE_CASE.EMPTY_NAME').subscribe((res: string) => {
          this.toast.error(res);
        });
      }
      return;
    }

    if (this.totalOdds !== 100) {
      if (!this.toast.currentlyActive) {
        this.translate.get('CREATE_CASE.TOTAL_ODD').subscribe((res: string) => {
          this.toast.error(res);
        });
      }
      return;
    }

    if (this.selectedItems.find(selectedItem => selectedItem.odd === 0)) {
      if (!this.toast.currentlyActive) {
        this.translate.get('CREATE_CASE.ZERO_ODD').subscribe((res: string) => {
          this.toast.error(res);
        });
      }
      return;
    }

    const items = [];
    this.selectedItems.map((selectedItem) => {
      items.push({
        item: selectedItem._id,
        odd: selectedItem.odd,
      });
    });

    this.store.dispatch(new fromCases.CrateCase({
      name: this.caseNameString,
      image: this.selectedLogo,
      items: items,
      affiliateCut: +this.affiliateCut,
    }));
  }

  public updateCase(): void {
    if (this.houseEdge < 0 && this.houseEdge > 100) {
      this.toast.error('houseEdge should be within 0 and 100');
      return;
    }

    const items = [];
    this.selectedItems.map((selectedItem) => {
      items.push({
        item: selectedItem._id,
        odd: selectedItem.odd,
      });
    });

    const editedCase: CaseModel = {
      name: this.caseNameString,
      image: this.selectedLogo,
      items: items,
      affiliateCut: +this.affiliateCut,
      price: this.price,
      houseEdge: this.houseEdge,
      salePercent: this.salePercent,
    };

    if (this.badgeLabel) {
      editedCase.badgeLabel = this.badgeLabel;
    }

    if (this.salePercent) {
      editedCase.salePercent = this.salePercent;
    }

    this.store.dispatch(new fromCases.EditCase({
      id: this.caseId,
      editedCase,
    }));
  }

  public onChangeType(event: MatOptionSelectionChange): void {
    if (!event.isUserInput) {
      return;
    }

    if (event.source.selected) {
      this.store.dispatch(new fromCases.AddCaseCategory({ caseId: this.caseId, category: event.source.value }));
    } else {
      this.store.dispatch(new fromCases.RemoveCaseCategory({ caseId: this.caseId, category: event.source.value }));
    }
  }

  public onChangeOdd(item: any): void {

    let odds = 0;
    this.selectedItems.map((selectedItem) => {
      selectedItem.odd = selectedItem._id === item.id ? +item.odd : selectedItem.odd;
      odds += selectedItem.odd;
    });

    // allowing odd to have 5th decimal place
    this.totalOdds = odds;

    if (this.totalOdds > 100) {
      if (!this.toast.currentlyActive) {
        this.translate.get('CREATE_CASE.TOTAL_ODD').subscribe((res: string) => {
          this.toast.error(res);
        });
      }
      return;
    }

    // if (this.totalOdds === 100) {
    // if (this.selectedItems.find(selectedItem => selectedItem.odd === 0)) {
    //   if (!this.toast.currentlyActive) {
    //     this.toast.error('Case contains odd 0 item');
    //   }
    //   return;
    // }

    const items = this.selectedItems.map((selectedItem) => ({
      item: selectedItem._id,
      odd: selectedItem.odd,
    }));

    this.store.dispatch(new fromCases.GetCasePrice({ items }));
    // } else {
    //   this.store.dispatch(new fromCases.ResetCasePrice());
    // }
  }

  openKeyboard(event) {
    if (event.Open) {
      this._ngxZendeskWebwidgetService.zE('webWidget', 'hide');
    } else {
      this._ngxZendeskWebwidgetService.zE('webWidget', 'show');
    }

  }

  public onDeleteOdd(item: any): void {
    this.totalOdds = sumBy(this.selectedItems, 'odd');
    this.selectedItems = this.selectedItems.filter((selectedItem) =>
      selectedItem._id !== item.id
    );
    this.selectedItemsIds = this.selectedItemsIds.filter(id => id !== item.id);

    if (this.totalOdds === 100) {
      if (this.selectedItems.find(selectedItem => selectedItem.odd === 0)) {
        if (!this.toast.currentlyActive) {
          this.translate.get('CREATE_CASE.ZERO_ODD').subscribe((res: string) => {
            this.toast.error(res);
          });
        }
        return;
      }

      this.store.dispatch(new fromCases.ResetCasePrice());
    } else {
      const items = this.selectedItems.map((selectedItem) => ({
        item: selectedItem._id,
        odd: selectedItem.odd,
      }));

      this.store.dispatch(new fromCases.GetCasePrice({ items }));
    }
  }


  public onFiltersChange(filter: CaseFilters): void {
    if (filter.sort) {
      this.filters = { orderBy: 'value', orderDir: filter.sort === 'Low' ? 'asc' : 'desc' };
    }

    if (filter.search !== undefined) {
      this.search = filter.search;
    }

    if (filter.tag) {
      this.tag = filter.tag;
    }

    this.pagination = { limit: this.pagination.limit, offset: 0 };
    this.siteItems = [];
    this.isScrollDisabled = true;
    this.loadSiteItems();
  }

  public onScroll() {
    this.pagination = { limit: this.pagination.limit, offset: this.pagination.offset + 1 };

    this.loadSiteItems();
  }

  private initCases(): void {
    this.caseLogos$.pipe(skip(1), takeUntil(this.unsubscribe$)).subscribe((logos) => {
      this.caseLogos = [];
      logos.map((logo) => {
        this.caseLogos.push({
          image: logo,
          color: this.colors[Math.floor(Math.random() * this.colors.length)],
        });
      });
    });

    this.casePrice$.pipe(takeUntil(this.unsubscribe$)).subscribe(casePrice => {
      this.price = casePrice;
    });
  }

  private initEditCase(): void {
    this.editCase$ = this.store.pipe(select(fromCases.selectCase));

    this.editCase$.pipe(takeUntil(this.unsubscribe$)).subscribe(_case => {
      this.caseId = this.route.snapshot.paramMap.get('id');
      if (!_case || (_case && _case._id !== this.caseId)) {
        return this.store.dispatch(new fromCases.LoadCase(this.caseId));
      }

      this.caseNameString = _case.name;
      this.badgeLabel = _case.badgeLabel;
      this.salePercent = _case.salePercent;
      this.affiliateCut = _case.affiliateCut;
      this.addToSelectedCases(_case);
      this.selectedItemsIds = _case.items.map(c => c.item._id);
      this.selectedTypes = _case.caseTypes;

      this.totalOdds = 0;
      const items = [];
      this.selectedItems = _case.items.map(c => {

        this.totalOdds += c.odd;
        items.push({
          item: c.item._id,
          odd: c.odd,
        });

        return { ...c.item, odd: c.odd };
      });
      this.totalOdds = +this.totalOdds.toFixed(5);

      this.store.dispatch(new fromCases.GetCasePrice({ items }));
    });
  }

  private initItems(): void {
    this.siteItems$.pipe(skip(1), takeUntil(this.unsubscribe$)).subscribe((items) => {
      items.map((item) => {
        this.siteItems = this.siteItems.filter(siteItem => siteItem !== item);
        this.siteItems.push({
          ...item,
          odd: 0,
        });
      });

      this.isScrollDisabled = false;
    });
  }

  public ngOnDestroy() {
    this.store.dispatch(new fromCases.ResetCasePrice());

    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
