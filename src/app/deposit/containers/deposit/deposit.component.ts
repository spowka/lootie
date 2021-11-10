import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NgxZendeskWebwidgetService } from 'ngx-zendesk-webwidget';

import { Observable, Subject, of } from 'rxjs';
import { debounceTime, takeUntil, skip } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import * as fromRoot from 'src/app/@store';
import * as fromlayout from 'src/app/@store/layout';
import * as fromDeposit from 'src/app/deposit/@store/deposit';
import * as fromRouter from 'src/app/@store/router';
import { DepositService } from '../../services/deposit.service';

import { DepositDialogComponent } from '../../components';
import { Title } from '@angular/platform-browser';
import { CasesService } from 'src/app/cases/services/cases.service';
import { ActivatedRoute, Router } from '@angular/router';

enum PaymentMethods {
  g2a = 'g2a',
  credit = 'credit',
  coinbase = 'coinbase',
  giftcards = 'giftcards',
  payop = 'payop',
}
const DEFAULT_DEPOSIT_AMOUNT = 100;

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.scss'],
})
export class DepositComponent implements OnInit, OnDestroy {
  public isMobile$: Observable<boolean>;

  public isLoading$: Observable<boolean>;

  public checkoutUrl$: Observable<string>;

  public isStatusSuccess$: Observable<boolean>;

  public isStatusFail$: Observable<string>;

  currentUrl$: Observable<string>;

  public paymentOption: string;

  public selectedMethod = PaymentMethods.credit;

  public amount = DEFAULT_DEPOSIT_AMOUNT;

  public amountList = [];

  private INITIAL_AMOUNT_LIST = [
    5,
    10,
    25,
    50,
    100,
    150,
    200,
    300,
    400,
    500,
    1000,
  ];

  public promocode: string;

  public promocodeStatus = '';

  public isPaymentFAQ = false;

  public depositTitle = 'DEPOSIT.CHOOSE_PAYMENT_METHOD';

  public PaymentMethods = PaymentMethods;

  public faqItems = [
    {
      title: 'DEPOSIT.FAQ.FIRST_STEP_TITLE',
      description: 'DEPOSIT.FAQ.FIRST_STEP_DESCRIPTION',
      color: '#4fc1e3',
    },
    {
      title: 'DEPOSIT.FAQ.SECOND_STEP_TITLE',
      description: 'DEPOSIT.FAQ.SECOND_STEP_DESCRIPTION',
      color: '#1abe66',
    },
    {
      title: 'DEPOSIT.FAQ.THIRD_STEP_TITLE',
      description: 'DEPOSIT.FAQ.THIRD_STEP_DESCRIPTION',
      color: '#f34747',
    },
    {
      title: 'DEPOSIT.FAQ.FOURTH_STEP_TITLE',
      description: 'DEPOSIT.FAQ.FOURTH_STEP_DESCRIPTION',
      color: '#9d63d2',
    },
  ];

  public readonly paymentMethods = [
    {
      value: PaymentMethods.credit,
      title: 'Credit card',
      bonus: '+3% BONUS',
      bonusInformation: 'Bonus info',
      logos: [
        'assets/images/logos/visad.svg',
        'assets/images/logos/master.svg',
      ],
    },
    {
      value: PaymentMethods.coinbase,
      title: 'Coinbase',
      bonus: '+5% BONUS',
      bonusInformation: 'Bonus info',
      logos: [
        'assets/images/logos/coinBase.svg',
        'assets/images/logos/litecoin.svg',
        'assets/images/logos/eth.svg',
        'assets/images/logos/xrp.svg',
      ],
    },
    {
      value: PaymentMethods.g2a,
      title: 'G2A',
      logos: [
        'assets/images/logos/skrill.svg',
        'assets/images/logos/trnsfer-bank.svg',
        'assets/images/logos/neteleter.svg',
        'assets/images/logos/union-pay.svg',
      ],
    },
    {
      value: PaymentMethods.giftcards,
      title: 'Giftcards',
      logos: ['assets/images/logos/paypal.svg'],
    },
    {
      value: PaymentMethods.payop,
      title: 'Alternative*',
      subtitle: '*Use this if the first option fails',
      logos: [
        'assets/images/logos/visad.svg',
        'assets/images/logos/master.svg',
        'assets/images/logos/paysafecard.svg',
      ],
    },
  ];

  private _debounceCode = new Subject<any>();

  private unsubscribe$: Subject<void> = new Subject();

  constructor(
    private _ngxZendeskWebwidgetService: NgxZendeskWebwidgetService,
    private store: Store<fromRoot.State>,
    private depositService: DepositService,
    private casesService: CasesService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private titleService: Title
  ) {
    this.isMobile$ = this.store.pipe(select(fromlayout.selectIsMobile));
    this.isLoading$ = this.store.pipe(select(fromDeposit.selectIsLoading));
    this.checkoutUrl$ = this.store.pipe(select(fromDeposit.selectCheckoutUrl));
    this.isStatusSuccess$ = this.store.pipe(
      select(fromDeposit.selectIsSuccess)
    );
    this.isStatusFail$ = this.store.pipe(select(fromDeposit.selectIsFail));
    this.currentUrl$ = this.store.pipe(select(fromRoot.selectgetActiveUrl));
    this.route.queryParams.subscribe(
      params => {
        if (params && params['mode']) {
          const mode = params['mode'];

          for (const key in PaymentMethods) {
            if (mode === key) {
              this.selectedMethod = params['mode'];
              this.startPayment(true);
            }
          }
        }
      }
    );

    this.titleService.setTitle('Deposit | Lootie');

    const promocode = localStorage.getItem('promocode');
    if (promocode) {
      this.promocode = promocode;
      localStorage.removeItem('promocode');
    }

    this._debounceCode.pipe(debounceTime(500)).subscribe(_ => {
      if (this.promocode === '') {
        this.promocodeStatus = '';
        return;
      }

      try {
        RegExp(this.promocode);
      } catch (error) {
        return (this.promocodeStatus = 'invalid');
      }

      this.isLoading$ = of(true);
      this.depositService.validatePromocode(this.promocode).subscribe(
        (res) => {
          this.isLoading$ = of(false);
          if (this.promocode) {
            this.promocodeStatus = 'valid';
          }
        },
        (res: Error) => {
          const error = res['error'];
          this.isLoading$ = of(false);
          if (this.promocode) {
            this.promocodeStatus = 'invalid';
          }
        }
      );
    });

    this.isStatusSuccess$
      .pipe(skip(1), takeUntil(this.unsubscribe$))
      .subscribe((isSuccess) => {
        if (isSuccess) {
          this.paymentOption = 'success';
        }

        // DepositDialogComponent.hide(this.dialog);
      });

    this.isStatusFail$
      .pipe(skip(1), takeUntil(this.unsubscribe$))
      .subscribe((failOption) => {
        if (failOption) {
          this.paymentOption = failOption;
        }

        // DepositDialogComponent.hide(this.dialog);
      });

    this.checkoutUrl$
      .pipe(skip(1), takeUntil(this.unsubscribe$))
      .subscribe((url) => {
        // if (!url) {
        //   return DepositDialogComponent.hide(this.dialog);
        // }
        // if (
        //   this.paymentOption === PaymentMethods.coinbase ||
        //   this.paymentOption === PaymentMethods.payop
        // ) {
        window.open(url, '_self');
        // } else {
        //   DepositDialogComponent.show(this.dialog, url);
        // }
      });
  }

  public ngOnInit() {}

  public onValidatePromocode() {
    this._debounceCode.next();
  }

  public sendTicket(): void {
    this._ngxZendeskWebwidgetService.zE('webWidget', 'open');
  }

  public onChangeAmount(isPositive: boolean): void {
    const currentIndex = this.amountList.indexOf(this.amount);
    if (isPositive) {
      this.amount = this.amountList[currentIndex + 1] || this.amount;
      return;
    }

    this.amount = this.amountList[currentIndex - 1] || this.amount;
  }

  public startPayment(isRouteCheck?: boolean): void {
    if (this.selectedMethod === PaymentMethods.giftcards) {
      this.amountList = this.INITIAL_AMOUNT_LIST.slice(2, 7);
      this.depositTitle = 'DEPOSIT.SELECT_GIFTCARD';
    } else {
      this.amountList = [...this.INITIAL_AMOUNT_LIST];
    }

    if (this.selectedMethod !== PaymentMethods.giftcards) {
      this.depositTitle = 'DEPOSIT.SELECT_YOUR_AMOUNT';
    }

    this.paymentOption = this.selectedMethod;

    if (!isRouteCheck) {
      this.router.navigate(['/deposit'], { queryParams: { mode: this.selectedMethod } });
    }

    window.analytics.track('Payment Method Chosen', {
      PaymentMethod: this.paymentOption,
      AddFundsButtonClicked: this.casesService.addFundsButtonClicked
    });
  }

  public goBack(): void {
    if (
      (!this.paymentOption || this.paymentOption === 'main') &&
      !this.isPaymentFAQ
    ) {
      this.store.dispatch(new fromRouter.Back());
    } else {
      this.openFAQ(false);
      this.promocode = '';
      this.promocodeStatus = '';
      this.amount = DEFAULT_DEPOSIT_AMOUNT;
      this.paymentOption = 'main';
      this.depositTitle = 'DEPOSIT.CHOOSE_PAYMENT_METHOD';
      this.router.navigate(['/deposit']);
    }
  }

  public clearPromocode(): void {
    this.promocode = '';
    this.promocodeStatus = '';
  }

  public openFAQ(value: boolean): void {
    this.isPaymentFAQ = value;
  }

  public currencyInputChanged(value) {
    const num = value.replace(/[$,]/g, '');
    return Number(num);
  }

  public proceedDeposit(): void {
    if (this.amount < 1 || this.promocodeStatus === 'invalid') {
      return;
    }

    this.store.dispatch(
      new fromDeposit.ProceedDeposit({
        type: this.paymentOption,
        data: this.amount,
        coupon: this.promocode,
      })
    );

    window.analytics.track('Payment Amount Chosen', {
      PaymentAmount: this.amount,
      AddFundsButtonClicked: this.casesService.addFundsButtonClicked
    });
  }

  public onOpenGiftCard() {
    // window.open(
    //   `https://www.gamivo.com/product/lootie-com-gift-card-${this.amount}-usd`,
    //   'targetWindow',
    //   'width=500, height=800'
    // );
    window.open(
      `https://shoppy.gg/@Lootie`,
      'targetWindow',
      'width=500, height=800'
    );
  }

  public ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
