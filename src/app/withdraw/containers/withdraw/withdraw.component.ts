import { Component, OnInit, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, Subject } from 'rxjs';
import { share, tap, takeUntil, take, skip } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { NgxZendeskWebwidgetService } from 'ngx-zendesk-webwidget';

import { Store, select } from '@ngrx/store';
import * as fromRoot from 'src/app/@store';
import * as fromAuth from 'src/app/auth/@store';
import * as fromLayout from 'src/app/@store/layout';
import * as fromWithdraw from 'src/app/withdraw/@store/withdraw';
import * as fromRouter from 'src/app/@store/router';

import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';

import { MatDialog, MatSelectChange } from '@angular/material';
import { DialogWithdrawAddItemsComponent } from '../../components/dialog-withdraw-add-items/dialog-withdraw-add-items.component';

import { User } from 'src/app/auth/models/user-profile';
import { SiteItemsModel, InventoryItemsModel, Pagination } from 'src/app/shared/models/index';
import { Title } from '@angular/platform-browser';
import { WithdrawalsModel } from 'src/app/withdraw/models';
import { ShippingCountry } from 'src/app/auth/models';

export enum WithdrawTabsModel {
  requests = 'requests',
  history = 'history',
}

@Pipe({ name: 'groupProperty' })
export class GroupPropertyPipe implements PipeTransform {
  transform(data: any[], isFormControl = false, filterArray = []) {
    const result = {};

    data
      .filter((o) => {
        if (!o.props) {
          return true;
        }

        let flag = true;
        filterArray.forEach((fa) => {
          if (o.props[fa.key] !== fa.value) {
            flag = false;
            return false;
          }
        });

        return flag;
      })
      .map((o) => {
        if (!o.props) {
          return false;
        }

        const props = Object.keys(o.props);
        props.map((prop) => {
          if (isFormControl) {
            if (!result[prop]) {
              result[prop] = ['', Validators.required];
            }
          } else {
            if (!result[prop]) {
              result[prop] = [];
            }

            if (!result[prop].includes(o.props[prop])) {
              result[prop].push(o.props[prop]);
            }
          }
        });
      });

    Object.keys(result).map((key) => {
      result[key] = result[key].sort();
    });

    return result;
  }
}

@Pipe({ name: 'safeHtml' })
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitized: DomSanitizer) {}
  transform(value) {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.scss'],
  providers: [GroupPropertyPipe, SafeHtmlPipe],
})
export class WithdrawComponent implements OnInit, OnDestroy {
  public user$: Observable<User>;

  public withdrawals: WithdrawalsModel[] = [];

  public additionalFees$: Observable<any>;
  public additionalFeeTotal = 0;

  public shippingCountries$: Observable<ShippingCountry[]>;

  currentUrl$: Observable<string>;

  public withdrawForm: FormGroup;

  public withdrawTabsModel = WithdrawTabsModel;

  public withdrawTabs = [
    { tab: WithdrawTabsModel.history, title: 'Withdraw', icon: 'assets/images/icons/money.svg' },
    {
      tab: WithdrawTabsModel.requests,
      title: 'Withdraw Requests',
      icon: 'assets/images/icons/request-box.svg',
    },
  ];

  public selectedWithdrawTab = WithdrawTabsModel.history;

  public items: FormArray;

  public selectedItems: InventoryItemsModel[] = [];

  public selectedVariants: any = {};
  public availableItemVariants: any = {};

  public isAddWithdrawModalOpened$: Observable<boolean>;

  public isMobile$: Observable<boolean>;

  public loading$: Observable<any>;

  public isTermsAgreed = false;

  public addressFromProfile = '';

  public pagination: Pagination;
  public isScrollDisabled = false;
  public mobileFaq = false;

  public readonly countries = [
    { code: 'CA', title: 'Canada' },
    { code: 'FR', title: 'France' },
    { code: 'US', title: 'United States' },
  ];

  public readonly shippingCostInfo =
    'We may need some additional costs for shipment and adjustment fee based on item variants';

  private _withdrawals$: Observable<WithdrawalsModel[]>;

  private unsubscribe$: Subject<void> = new Subject();

  private agreeWithTermsState = false;
  private agreeWithTermsSubject$: Subject<{ previous: boolean; next: boolean }> = new Subject();
  private _user: User;

  constructor(
    private store: Store<fromRoot.State>,
    private formBuilder: FormBuilder,
    private toast: ToastrService,
    private groupProperty: GroupPropertyPipe,
    private _ngxZendeskWebwidgetService: NgxZendeskWebwidgetService,
    public dialog: MatDialog,
    private titleService: Title
  ) {
    this.user$ = this.store.pipe(select(fromAuth.selectUser));
    this.isMobile$ = this.store.pipe(select(fromLayout.selectIsMobile));
    this.loading$ = this.store.pipe(select(fromWithdraw.selectIsLoading));
    this.additionalFees$ = this.store.pipe(select(fromWithdraw.selectAdditionalFees));
    this.shippingCountries$ = this.store.pipe(select(fromAuth.selectShippingCountries));
    this._withdrawals$ = this.store.pipe(select(fromWithdraw.selectWithdrawals));
    this.currentUrl$ = this.store.pipe(select(fromRoot.selectgetActiveUrl));

    this.titleService.setTitle('Withdraw | Lootie');

    this.store.dispatch(new fromAuth.GetShippingCountries());
    this.withdrawForm = this.formBuilder.group({
      withdrawalOption: ['REAL_WORLD', Validators.required],
      shipping: this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        phoneNumber: ['', Validators.required],
        address: ['', Validators.required],
        postalCode: ['', Validators.required],
        country: ['', Validators.required],
        city: ['', Validators.required],
        province: ['', Validators.required],
        email: [
          '',
          Validators.compose([
            Validators.required,
            Validators.pattern(
              /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            ),
          ]),
        ],
      }),
      items: this.formBuilder.array([]),
      note: [''],
    });

    this.isAddWithdrawModalOpened$ = this.store.pipe(
      select(fromWithdraw.selectAddWithdrawModalOpened)
    );

    this.isMobile$.pipe(take(1)).subscribe((isMobile) => {
      if (!isMobile) {
        this.mobileFaq = false;
      }
    });

    this.pagination = { limit: 12, offset: 0 };
    this.loadWithdrawals();
  }

  fillInAddress(location_obj) {
    this.withdrawForm.get('shipping').patchValue(location_obj);
  }

  ngOnInit() {
    this.onAgreeWithTermsChange().subscribe((isSelected) => {
      this.isTermsAgreed = isSelected.next;
    });
    this.user$.pipe(take(1)).subscribe((user) => {
      this._user = user;
      this.setShippingAddress();
    });

    this.isAddWithdrawModalOpened$.pipe(takeUntil(this.unsubscribe$)).subscribe((opened) => {
      if (opened) {
        const dialogRef = DialogWithdrawAddItemsComponent.show(this.dialog, this.selectedItems);

        dialogRef.afterClosed().subscribe((selectedItems) => {
          if (selectedItems) {
            if (this.items) {
              while (this.items.length) {
                this.items.removeAt(0);
              }
            }

            this.selectedVariants = {};
            selectedItems.map((inventory) => {
              this.addItem(inventory);
              this.selectedVariants[inventory._id] = [];
              this.availableItemVariants[inventory._id] = [];
              const result = this.groupProperty.transform(inventory.item.availableVariants);
              Object.keys(result)
                .sort()
                .forEach((varnt) => {
                  this.availableItemVariants[inventory._id].push({
                    key: varnt,
                    value: result[varnt],
                  });
                });
            });
            this.selectedItems = selectedItems;
            this.store.dispatch(new fromWithdraw.ResetAdditionalFee());
            this.additionalFeeTotal = 0;
          }
        });
      }
    });

    this._withdrawals$.pipe(skip(1), takeUntil(this.unsubscribe$)).subscribe((withdrawals) => {
      withdrawals.map((withdrawal) => this.withdrawals.push(withdrawal));
    });

    this.additionalFees$.pipe(takeUntil(this.unsubscribe$)).subscribe((fees) => {
      this.additionalFeeTotal = 0;
      if (!this.selectedItems || this.selectedItems.length === 0) {
        return;
      }
      const inventory = this.selectedItems && this.selectedItems[0];
      if (!inventory || !inventory._id) {
        return;
      }
      const fee = fees[inventory._id];
      if (!fee) {
        return;
      }
      this.additionalFeeTotal = fee.shipment;
    });
  }

  sendTicket(): void {
    this._ngxZendeskWebwidgetService.zE('webWidget', 'open');
  }

  onChangeAgreeWithTerms(ob: MatCheckboxChange) {
    const agreeWithTerms = ob.checked ? true : false;
    this.agreeWithTermsSubject$.next({ previous: this.agreeWithTermsState, next: agreeWithTerms });
  }

  onAgreeWithTermsChange() {
    return this.agreeWithTermsSubject$.pipe(
      tap(({ next }) => (this.agreeWithTermsState = next)),
      share()
    );
  }

  onSelectionChange(id: string, key: string, e: MatSelectChange): void {
    const item = this.items.value.find((val) => val.id === id);
    const inventory = this.selectedItems.find((inv) => inv._id === id);
    const variant = inventory.item.availableVariants.find(
      (varnt) => JSON.stringify(varnt.props) === JSON.stringify(item.details)
    );

    if (!this.selectedVariants[id]) {
      this.selectedVariants[id] = [];
    }
    let variantIndex = this.selectedVariants[id].findIndex((varnt) => varnt.key === key);
    if (variantIndex === -1) {
      this.selectedVariants[id].push({ key: key, value: e.value });
      variantIndex = this.selectedVariants[id].length - 1;
    } else {
      this.selectedVariants[id][variantIndex].value = e.value;
      this.selectedVariants[id].length = variantIndex + 1;

      const itemIndex = this.items.value.findIndex((val) => val.id === id);
      const _arrayItem = this.items.controls[itemIndex] as FormGroup;
      const _details = _arrayItem.controls.details as FormGroup;
      const setKeys = this.selectedVariants[id].map((varnt) => varnt.key);
      Object.keys(item.details).map((_key) => {
        if (!setKeys.includes(_key)) {
          _details.controls[_key].reset();
        }
      });
    }

    const selectedKeys = this.selectedVariants[id].map((varnt) => varnt.key);
    const sortedKeys = this.availableItemVariants[id].map((varnt) => varnt.key).sort();
    this.availableItemVariants[id] = this.availableItemVariants[id].sort((a, b) => {
      let aInd = selectedKeys.indexOf(a.key);
      let bInd = selectedKeys.indexOf(b.key);
      if (aInd === -1) {
        aInd = sortedKeys.indexOf(a.key) + selectedKeys.length;
      }
      if (bInd === -1) {
        bInd = sortedKeys.indexOf(b.key) + selectedKeys.length;
      }
      if (aInd < bInd) {
        return -1;
      }
      if (aInd === bInd) {
        return 0;
      }
      return 1;
    });

    const result = this.groupProperty.transform(
      inventory.item.availableVariants,
      false,
      this.selectedVariants[id]
    );
    for (let i = variantIndex + 1; i < this.availableItemVariants[id].length; i++) {
      this.availableItemVariants[id][i].value = result[this.availableItemVariants[id][i].key];
    }

    if (variant) {
      const payload = this.getPayload(true);
      this.store.dispatch(new fromWithdraw.GetAdditionalFee(payload));
    } else {
      this.store.dispatch(new fromWithdraw.ResetAdditionalFee(id));
      this.additionalFeeTotal = 0;
    }
  }

  openWithdrawAddItemsDialog(): void {
    this.store.dispatch(new fromWithdraw.OpenAddWithdrawModal());
  }

  addItem(inventory: InventoryItemsModel): void {
    this.items = this.withdrawForm.get('items') as FormArray;
    this.items.push(
      this.formBuilder.group({
        id: inventory._id,
        details: this.formBuilder.group(
          this.groupProperty.transform(inventory.item.availableVariants, true)
        ),
      })
    );
  }

  onDeleteWithdrawal(item: SiteItemsModel): void {
    this.selectedItems = this.selectedItems.filter((selectedItem, index) => {
      if (selectedItem.item !== item) {
        return true;
      }
      this.items.removeAt(index);
      this.store.dispatch(new fromWithdraw.ResetAdditionalFee(selectedItem._id));
      return false;
    });
  }

  reset(): void {
    if (this.items) {
      this.selectedItems = [];
      while (this.items.length) {
        this.items.removeAt(0);
      }
    }

    if (this.isTermsAgreed) {
      this.isTermsAgreed = !this.isTermsAgreed;
    }

    this.withdrawForm.reset();
    this.withdrawForm.get('withdrawalOption').setValue('REAL_WORLD');
    this.setShippingAddress();
  }

  confirmWithdrawal(): void {
    if (this.withdrawForm.invalid) {
      return;
    }

    let totalPrice = 0;
    this.selectedItems.map((inventory) => (totalPrice += +inventory.item.value));

    const payload = this.getPayload(false);

    this.store.dispatch(new fromWithdraw.CreateWithdrawal(payload));
    this.reset();

    document.getElementById('withdraw-container').scrollIntoView();
  }

  getPayload(isForFee) {
    const payload = { ...this.withdrawForm.value };
    const result = [];

    payload.items.forEach((item) => {
      const inventory = this.selectedItems.find((inv) => inv._id === item.id);
      const variant = inventory.item.availableVariants.find(
        (varnt) => JSON.stringify(varnt.props) === JSON.stringify(item.details)
      );

      if (isForFee) {
        const v: any = {
          id: item.id,
          siteItemId: inventory.item._id,
        };
        if (variant) {
          v.variantId = variant._id;
        }
        if (inventory.item.availableVariants.length === 1) {
          v.variantId = inventory.item.availableVariants[0]._id;
        }

        result.push(v);
      } else if (variant) {
        item.details.variantId = variant._id;
      }
    });

    if (!payload.note) {
      delete payload.note;
    }

    return isForFee ? result.filter((v) => !!v.variantId) : payload;
  }

  onScroll() {
    this.pagination = { limit: this.pagination.limit, offset: this.pagination.offset + 1 };

    this.loadWithdrawals();
  }

  loadWithdrawals(): void {
    this.store.dispatch(
      new fromWithdraw.LoadWithdrawals({
        pagination: this.pagination,
      })
    );
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.store.dispatch(new fromWithdraw.ResetAdditionalFee());
    this.additionalFeeTotal = 0;
  }

  goBack() {
    if (this.mobileFaq) {
      this.mobileFaq = !this.mobileFaq;
      return;
    }
    this.store.dispatch(new fromRouter.Back());
  }

  setShippingAddress() {
    const shippingForm = this.withdrawForm.get('shipping') as FormGroup;

    if (!this._user.shippingAddress) {
      return;
    }

    shippingForm.patchValue({
      firstName: this._user.shippingAddress.firstName,
      lastName: this._user.shippingAddress.lastName,
      phoneNumber: this._user.shippingAddress.phoneNumber,
      address: this._user.shippingAddress.address,
      postalCode: this._user.shippingAddress.postalCode,
      country: this._user.shippingAddress.country,
      city: this._user.shippingAddress.city,
      province: this._user.shippingAddress.province,
      email: this._user.shippingAddress.email || this._user.email,
    });
    (<any>Object).values(shippingForm.controls).forEach((control) => {
      control.markAsTouched();
    });
    if (shippingForm.valid) {
      this.addressFromProfile = [
        this._user.shippingAddress.address,
        this._user.shippingAddress.city,
        this._user.shippingAddress.province,
        this._user.shippingAddress.postalCode,
        this._user.shippingAddress.country,
      ].join(', ');
    }
  }
}
