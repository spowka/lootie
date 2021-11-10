import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';

import { Observable, Subject } from 'rxjs';
import { takeUntil, skip, take } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { Store, select } from '@ngrx/store';
import * as fromRoot from 'src/app/@store';
import * as fromAuth from 'src/app/auth/@store/auth';
import * as fromLayout from 'src/app/@store/layout';
import * as fromCases from 'src/app/cases/@store';
import * as fromProvablyFair from 'src/app/@store/provably-fair';
import * as fromRouter from 'src/app/@store/router';
import { CasesService } from 'src/app/cases/services/cases.service';

import { DialogItemDescriptionComponent } from '../dialog-item-description/dialog-item-description.component';

import {
  CaseModel,
  SpinnerItems,
  CaseUnboxingModel,
  CaseType,
  CaseViewItemModel,
  SpinnerItemTypes,
  SpinnerItemPossibility,
  UnboxingAnimation,
} from 'src/app/cases/models';

import { User } from 'src/app/auth/models/user-profile';
import { NavbarItem } from 'src/app/shared/models';
import delay from 'src/app/shared/utils/delay';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { unboxingAnimationMap } from './unboxing-animation';

@Component({
  selector: 'app-daily-case',
  templateUrl: './daily-case.component.html',
  styleUrls: ['./daily-case.component.scss', './sprite-sheet.scss'],
  animations: [
    trigger('rotatedState', [
      state('default', style({ transform: 'rotate(0deg)' })),
      state('rotated', style({ transform: 'rotate(-180deg)' })),
      transition('default <=> rotated', animate('300ms ease-in-out'))
    ])
  ],
})
export class DailyCaseComponent implements OnInit, OnDestroy {
  public id: string;

  public isChatOpened$: Observable<boolean>;

  public isMobile$: Observable<boolean>;

  public isLoggedIn$: Observable<boolean>;

  public isLoaded$: Observable<boolean>;

  public isDescriptionModalOpened$: Observable<boolean>;

  public itemDetails$: Observable<CaseViewItemModel>;

  public isDaily = false;

  public isDailyExpired = false;

  public isFree = false;

  public user: User;

  public unboxingCase: CaseModel;

  public unboxing: CaseUnboxingModel;

  public itemTypes = SpinnerItemTypes;

  public winItemAnimation = '';
  public winItemAnimationIndex = -1;

  public itemPossibility = SpinnerItemPossibility;

  public caseItems: any[] = [];

  public spinner: any[] = [];

  public originalItems: any[] = [];

  public winItems: any;

  public showWinItems = false;

  public isSelling = false;

  public casesQuantity = 1;

  public casesQuantityArr = [];

  public soldItems = [];

  public isTestSpin = false;

  public spinnerConfig = {
    itemWidth: 176,
    itemHeight: 196,
    itemShown: 9,
    itemOffset: 4,
    itemOffsetHeight: 0,
    gapWidth: 160,
    gapHeight: 180,
    delay: 13000, // speed in miliseconds
    disabled: false,
    loading: false
  };

  public dailyCase = {
    timer: null,
    text: ''
  };

  public audio: HTMLAudioElement;

  public navItems: NavbarItem[] = [
    {
      url: '/rewards',
      title: 'Community Rewards',
      icon: 'assets/images/icons/reward.svg'
    },
    {
      url: '/mysterybox/daily',
      title: 'Daily Box',
      icon: 'assets/images/icons/daily-case.svg'
    }
  ];

  public selectedBackground: string;

  public showOdds = false;

  public hideOverflow = false;

  public isOpenInsufficient = true;

  public isAudioPlay = true;

  public isDepositLow: boolean;

  public isMobile = false;

  public spinning = false;

  private winIndexes = [];

  private initialStyle = {
    transform: 'matrix(1, 0, 0, 1, 0, 0)',
    transition: 'transform 0ms ease  0s'
  };

  private clientSeed: string;

  private _spinnerItems$: Observable<SpinnerItems>;

  private _clientSeed$: Observable<string>;

  private _unboxingCase$: Observable<CaseUnboxingModel>;

  private _caseCount$: Observable<number>;

  private _user$: Observable<User>;

  currentUrl$: Observable<string>;

  public theme$: Observable<string>;

  private unsubscribe$: Subject<void> = new Subject();

  private refCode: string = '';

  constructor(
    private store: Store<fromRoot.State>,
    private route: ActivatedRoute,
    private router: Router,
    private fromService: CasesService,
    private toast: ToastrService,
    private dialog: MatDialog,
    private titleService: Title,
    private translate: TranslateService,
    private cdr: ChangeDetectorRef
  ) {
    this.selectedBackground = `pattern-${Math.floor(Math.random() * (6 - 1) + 1)}`;
    this.isChatOpened$ = this.store.pipe(select(fromLayout.selectChatOpened));
    this.isMobile$ = this.store.pipe(select(fromLayout.selectIsMobile));
    this.isLoggedIn$ = this.store.pipe(select(fromAuth.selectIsLoggedIn));
    this.theme$ = this.store.pipe(select(fromRoot.selectTheme));
    this.isDescriptionModalOpened$ = this.store.pipe(
      select(fromCases.selectDescriptionModalOpened)
    );
    this.itemDetails$ = this.store.pipe(select(fromCases.selectItemDetails));
    this._spinnerItems$ = this.store.pipe(select(fromCases.selectSpinnerItems));
    this._clientSeed$ = this.store.pipe(
      select(fromProvablyFair.selectClientSeed)
    );
    this._unboxingCase$ = this.store.pipe(select(fromCases.selectUnboxingCase));
    this._caseCount$ = this.store.pipe(select(fromCases.selectCaseCount));
    this.isLoaded$ = this.store.pipe(select(fromCases.selectLoaded));
    this.currentUrl$ = this.store.pipe(select(fromRoot.selectgetActiveUrl));
    this.store.pipe(takeUntil(this.unsubscribe$), select(fromAuth.selectRefCode))
      .subscribe((refCode: string) => {
        this.refCode = refCode;
      });

    this.casesQuantityArr = Array(3)
      .fill(null)
      .map((x, i) => i + 1);

    this.isMobile$.subscribe(data => {
      this.isMobile = data;
      if (this.isMobile) {
        this.onSelectionChange(1);
      }
    });

    this.route.params.pipe(skip(1)).subscribe(routeParams => {
      if (this.id === routeParams.id) {
        return;
      }

      this.id = routeParams.id;

      if (this.showWinItems) {
        this.tryAgain();
      }

      if (this.casesQuantity > 1) {
        this.selectCase(1);
      }

      this.resetUnboxing();
      this.spinner = [];
      this.caseItems = [];
      delete this.unboxingCase;
      this.loadSpinnerItems();
    });

    this.id = this.route.snapshot.paramMap.get('id');
    this.isDaily = !this.id;

    if (this.isDaily) {
      this.titleService.setTitle(
        'Free Daily Box | Open Mystery Boxes at Lootie'
      );
    } else {
      this.titleService.setTitle(
        'Lootie.com: Open Mystery Boxes | Unbox Authentic Products | Provably fair odds'
      );
    }

    this._caseCount$
      .pipe(take(1), takeUntil(this.unsubscribe$))
      .subscribe(count => (this.casesQuantity = count));

    this._clientSeed$.pipe(takeUntil(this.unsubscribe$)).subscribe(seed => {
      this.clientSeed = seed;
    });

    this._unboxingCase$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(unboxingCase => {
        if (!unboxingCase && this.unboxing) {
          return delete this.unboxing;
        }

        this.unboxing = unboxingCase;
      });
  }

  ngOnInit() {
    this.subscribeToSpinnerItems();
    this.subscribeToUserInfo();
    this.initAudio();
    this.getUnboxDisabledState();
    this.store.dispatch(new fromLayout.EnableLiveFeed(false));
  }

  login(): void {
    if (this.unboxingCase) {
      localStorage.setItem('boxId', this.unboxingCase._id);
      localStorage.setItem('boxName', this.unboxingCase.name);
    }

    this.store.dispatch(new fromLayout.OpenLoginModal());
  }

  loadSpinnerItems() {
    this.store.dispatch(new fromCases.LoadSpinnerItems(this.id));
  }

  loadDailyCaseItems() {
    return this.fromService.getDailyCase().subscribe(
      res => {
        if (!res['data']) {
          return;
        }

        this.store.dispatch(new fromCases.LoadSpinnerItems(res['data']._id));
      },
      res => {
        const error = res['error'];
        this.translate.get('UNDEFINED_ERROR').subscribe((response: string) => {
          this.toast.error(error && error.message ? error.message : response);
        });
      }
    );
  }

  subscribeToSpinnerItems() {
    this._spinnerItems$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(spinner => {
        if (this.isDaily) {
          if (
            !spinner ||
            (spinner && !spinner.caseInfo.caseTypes.includes(CaseType.daily))
          ) {
            return this.loadDailyCaseItems();
          }
        } else {
          if (
            !spinner ||
            (spinner &&
              spinner.caseInfo._id !== this.id &&
              spinner.caseInfo.slug !== this.id)
          ) {
            return this.loadSpinnerItems();
          }
        }

        const sortedItems = [...spinner.itemInfo];
        sortedItems.sort((a, b) => b.price - a.price);

        this.unboxingCase = spinner.caseInfo;
        window.analytics.track('Box Viewed', {
          BoxNameViewed: this.unboxingCase.name,
          BoxIDViewed: this.unboxingCase._id
        });
        this.isFree = spinner.caseInfo.caseTypes.includes(CaseType.free);
        this.caseItems = sortedItems;

        this.spinner = [];
        const itemsArray = [];

        // order categories
        const _caseItems = this.caseItems
          .map(item => {
            if (item.price < 2.5) {
              return { ...item, category: this.itemTypes.common };
            } else if (item.price < 10 && item.price >= 2.5) {
              return { ...item, category: this.itemTypes.uncommon };
            } else if (item.price < 20 && item.price >= 10) {
              return { ...item, category: this.itemTypes.rare };
            } else if (item.price < 100 && item.price >= 20) {
              return { ...item, category: this.itemTypes.epic };
            } else if (item.price < 2000 && item.price >= 100) {
              return { ...item, category: this.itemTypes.exotic };
            } else if (item.price >= 2000) {
              return { ...item, category: this.itemTypes.legendary };
            }
          })
          .reduce(function (rv, x) {
            // group by category
            (rv[x['category']] = rv[x['category']] || []).push(x);
            return rv;
          }, {});

        // all available categories list on box
        const availableCategorites = Object.keys(_caseItems);

        // calculate total possibility count
        let totalPossibility = 0;
        availableCategorites.map(
          category => (totalPossibility += +this.itemPossibility[category])
        );

        // each category count for spinner
        const categoryCount = {};
        availableCategorites.map(category => {
          categoryCount[category] = Math.ceil(
            (90 /
              ((totalPossibility / +this.itemPossibility[category]) * 100)) *
            100
          );
        });

        availableCategorites.map(category => {
          for (let i = 0; i < categoryCount[category]; i++) {
            if (itemsArray.length >= 90) {
              break;
            }

            itemsArray.push(
              _caseItems[category][
              Math.floor(Math.random() * _caseItems[category].length)
              ]
            );
          }
        });

        for (let i = 0; i < this.casesQuantity; i++) {
          this.spinner = [
            ...this.spinner,
            {
              style: this.initialStyle,
              items: this.shuffle(itemsArray)
            }
          ];
        }
        this.originalItems = [...itemsArray];
        this.spinnerConfig.disabled = false;
        this.hideOverflow = false;
        this.isOpenInsufficient = true;
      });

    this.isDescriptionModalOpened$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(opened => {
        if (opened) {
          DialogItemDescriptionComponent.show(this.dialog);
        }
      });
  }

  getItem(id: string) {
    return this.caseItems.find(x => x._id === id);
  }

  onSelectionChange(val: number) {
    this.getUnboxDisabledState();
    if (this.spinnerConfig.disabled) {
      return;
    }

    this.hideOverflow = false;
    this.selectCase(val);
    this.resetUnboxing();
  }

  selectCase(val: number): void {
    this.casesQuantity = val;

    while (this.spinner.length !== val) {
      if (this.spinner.length > val) {
        this.spinner.pop();
        continue;
      }

      this.spinner = [
        ...this.spinner,
        {
          style: this.initialStyle,
          items: this.shuffle(this.originalItems)
        }
      ];
    }
  }

  goToProvablyFair(): void {
    if (!this.user) {
      return;
    }

    if (!this.unboxing && this.unboxingCase) {
      this.store.dispatch(
        new fromCases.UnboxCase({
          caseId: this.unboxingCase._id,
          slug: this.unboxingCase.slug,
          seed: this.clientSeed,
          count: this.casesQuantity
        })
      );
    }

    this.store.dispatch(new fromProvablyFair.SetUrlFrom(this.router.url));
    this.router.navigate(['/provably-fair/unboxings']);
  }

  goBack() {
    this.store.dispatch(new fromRouter.Back());
  }

  initAudio() {
    this.audio = new Audio('/assets/audio/spinning_reel.wav');
    this.audio.load();
  }

  unbox(): void {
    if (this.spinnerConfig.disabled) {
      return;
    }

    if (!this.user) {
      return this.store.dispatch(new fromLayout.OpenLoginModal());
    }

    if (this.isFree && this.user.hasFreeboxOpened) {
      return;
    }

    this.spinnerConfig.loading = true;
    this.spinnerConfig.disabled = true;
    this.getUnboxDisabledState();

    if (this.unboxing) {
      this.rollAnUnboxing(this.unboxing._id);
      this.resetUnboxing();
      return;
    }

    this.fromService
      .unboxCase({
        caseId: this.unboxingCase._id,
        seed: this.clientSeed,
        count: this.casesQuantity
      })
      .subscribe(
        res => {
          if (!res['data']) {
            return;
          }

          const unboxingId = res['data']._id;
          this.rollAnUnboxing(unboxingId);
          this.spinnerConfig.disabled = false;
        },
        res => {
          this.resetSpin();
          this.spinnerConfig.disabled = false;
          const error = res['error'];
          this.translate
            .get('UNDEFINED_ERROR')
            .subscribe((response: string) => {
              this.toast.error(
                error && error.message ? error.message : response
              );
            });
        }
      );

      this.getUnboxDisabledState();
  }

  rollAnUnboxing(unboxingId): void {
    this.fromService.rollAnUnboxing(unboxingId).subscribe(
      res => {
        if (!res['data']) {
          return;
        }

        this.hideOverflow = true;

        if (this.isDaily) {
          this.store.dispatch(new fromAuth.UpdateUserInfo());
        }

        if (this.casesQuantity > 0) {
          this.store.dispatch(
            new fromAuth.UpdateUserUnboxedCases({
              unboxedCases: this.user.unboxedCases + this.casesQuantity
            })
          );
        }

        this.spinnerConfig.loading = false;
        this.winItems = res['data'].winItemInfo;

        this.spinStart(false);

        this.store.dispatch(new fromCases.RollAnUnboxing(this.winItems));

        if (this.isFree) {
          this.store.dispatch(new fromAuth.UpdateHasFreeBoxOpened(true));
        }

        const rollInfo = res['data'].rollInfo;
        const previousSeeds = {
          clientSeed: rollInfo.clientSeed,
          serverSeed: [rollInfo.seed],
          serverSeedHashed: [rollInfo.seedHash]
        };

        this.store.dispatch(
          new fromProvablyFair.SetPreviousSeeds(previousSeeds)
        );
      },
      res => {
        this.resetSpin();
        const error = res['error'];
        this.translate.get('UNDEFINED_ERROR').subscribe((response: string) => {
          this.toast.error(error && error.message ? error.message : response);
        });
      }
    );
  }

  tryAgain(): void {
    this.showWinItems = false;
    this.hideOverflow = false;
    this.winItems = [];
    this.soldItems = [];
    this.getUnboxDisabledState();
  }

  sellAllCaseItems(): void {
    const ids = this.winItems.filter(item => !this.soldItems.includes(item.userItem._id)).map(item => {
      window.analytics.track('Item Sold', {
        ProductNameSold: item.item.name,
        ProductIDSold: item.item._id,
        AmountSold: item.item.value
      });

      return item.userItem._id;
    });

    this.store.dispatch(new fromCases.SellItems(ids));

    this.soldItems = [...this.soldItems, ...ids];
    this.isSelling = false;
  }

  sellCase(item: any): void {
    this.store.dispatch(new fromCases.SellItems([item.userItem._id]));
    this.soldItems.push(item.userItem._id);
    this.isSelling = false;


    window.analytics.track('Item Sold', {
      ProductNameSold: item.item.name,
      ProductIDSold: item.item._id,
      AmountSold: item.item.value
    });
  }

  getUnboxDisabledState(): boolean {
    if (!this.user) {
      return true;
    }
    const isDepositAmountLow = this.user.depositedValue < 5;
    const isBalanceLow =
      this.user &&
      this.unboxingCase &&
      this.user.balance < this.unboxingCase.price * this.casesQuantity;

    return this.isDepositLow = (
      this.spinnerConfig.disabled ||
      (!this.isFree &&
        ((this.isDaily && isDepositAmountLow) ||
          (!this.isDaily && isBalanceLow)))
    );
  }

  addFunds() {
    this.fromService.addFundsButtonClicked = true;
    if (this.unboxingCase) {
      localStorage.setItem('boxId', this.unboxingCase._id);
      localStorage.setItem('boxName', this.unboxingCase.name);

      window.analytics.track('Add Funds Window Opened', {
        BoxLedToAddFunds: this.unboxingCase.name,
        BoxIDLedToAddFunds: this.unboxingCase._id
      });
    }
  }

  spinStart(isFree: boolean): void {
    if (this.isFree) {
      window.analytics.track('Box Opened', {
        BoxNameSpun: this.unboxingCase.name,
        BoxIDSpun: this.unboxingCase._id,
        FreeBoxCode: this.refCode.toLowerCase(),
        BoxCost: this.unboxingCase.price,
      });
    } else {
      window.analytics.track('Box Opened', {
        BoxNameSpun: this.unboxingCase.name,
        BoxIDSpun: this.unboxingCase._id,
        BoxCost: this.unboxingCase.price,
        BoxCount: this.casesQuantity,
      });
    }

    this.isTestSpin = isFree;

    if (this.isAudioPlay && this.audio) {
      if (this.audio.currentTime > 0) {
        this.stopAudio();
      }

      this.audio.play()
        .then(() => { })
        .catch(error => { });
    }

    const _spinner = [...this.spinner];

    if (isFree) {
      this.spinnerConfig.disabled = true;
      this.hideOverflow = true;

      this.winItems = Array(this.casesQuantity).fill(0).map((_, index) => {
        const randomUnit = Math.random() * 100;
        return {
          item: this.caseItems.find(v => v.rangeStart <= randomUnit && v.rangeEnd >= randomUnit)
        };
      });
    }

    const spinnerPromises = this.winItems.map((winCase, i) => {
      const winIndex = this.generateIndex();
      const winItem = winCase.item;

      // array modification
      if (Math.random() <= 0.7) {
        const midItemCount = Math.min(Math.random() * this.caseItems.length, 5);
        for (let _i = 0; _i < midItemCount; _i++) {
          if (_spinner[i] && _spinner[i].items) {
            _spinner[i].items[
              this.randomIndex(_spinner[i].items.length)
            ] = this.caseItems[
              this.randomIndex(this.caseItems.length)
              ];
          }
        }
      }
      if (Math.random() <= 0.5) {
        const highItemCount = Math.round(Math.random() * 3);
        const highItemRange = 5; // - 3 ~ 2 range

        for (let _i = 0; _i < highItemCount; _i++) {
          const highItemIndex = winIndex - ((3 - (Math.round(Math.random() * highItemRange))) || 2);
          const _highItemIndex = this.randomIndex(this.caseItems.length, 4);
          if (_spinner[i] && _spinner[i].items) {
            _spinner[i].items.splice(
              highItemIndex,
              1,
              this.caseItems[_highItemIndex]
            );
          }
        }
      }
      if (this.isFree) {
        const highItemIndex = winIndex - 1;
        const _highItemIndex = this.randomIndex(this.caseItems.length, 4);
        if (_spinner[i] && _spinner[i].items) {
          _spinner[i].items.splice(
            highItemIndex,
            1,
            this.caseItems[_highItemIndex]
          );
        }
      }

      if (_spinner[i] && _spinner[i].items) {
        _spinner[i].items.splice(winIndex, 1, winItem);
      }
      this.spinner = _spinner;

      const offsetX =
        this.spinnerConfig.itemOffset * this.spinnerConfig.itemWidth;
      const offsetY =
        this.spinnerConfig.itemOffsetHeight * this.spinnerConfig.itemHeight;
      const gapX =
        Math.floor(Math.random() * this.spinnerConfig.gapWidth) -
        this.spinnerConfig.gapWidth / 2;
      const gapY =
        Math.floor(Math.random() * this.spinnerConfig.gapHeight) -
        this.spinnerConfig.gapHeight / 2;
      const X = (winIndex * this.spinnerConfig.itemWidth - offsetX + gapX) * -1;
      const Y =
        (winIndex * this.spinnerConfig.itemHeight - offsetY + gapY) * -1;

      return new Promise(resolve => {
        if (this.spinner[i]) {
          if (this.isMobile && this.winItems.length > 1) {
            this.spinner[i].style = {
              transform: `matrix(1, 0, 0, 1, 0, ${Y})`,
              transition: `transform ${this.spinnerConfig.delay}ms cubic-bezier(0, 0, 0.28, 1) 0s`,
            };
          } else {
            this.spinner[i].style = {
              transform: `matrix(1, 0, 0, 1, ${X}, 0)`,
              transition: `transform ${this.spinnerConfig.delay}ms cubic-bezier(0, 0, 0.28, 1) 0s`,
            };
          }
        }
        resolve();
      });
    });

    Promise.all(spinnerPromises)
      .then(() => {
        this.spinning = true;
      })
      .then(() => delay(200))
      .then(() => {
        this.cdr.detach();
      })
      .then(() => delay(this.spinnerConfig.delay))
      .then(() => {
        this.cdr.reattach();
        this.spinning = false;

        if (!isFree) {
          this.showWinItems = true;
        }

        // set unboxing animation type
        let unboxingAnimation: UnboxingAnimation = {
          order: 0,
          name: 'common',
          duration: 1000,
        };
        let animatedIndex: number = -1;
        this.winItems.forEach((winItem: any, i: number) => {
          const anim = unboxingAnimationMap[winItem.item.color];
          if (unboxingAnimation.order < anim.order) {
            unboxingAnimation = anim;
            animatedIndex = i;
          }
        });

        const hasAllSameColor = this.winItems.every(
          (winItem) =>
            unboxingAnimation.name ===
            unboxingAnimationMap[winItem.item.color].name
        );

        if (this.winItems.length === 3 && hasAllSameColor) {
          this.winItemAnimationIndex = 1;
        } else {
          this.winItemAnimationIndex = animatedIndex;
        }
        this.winItemAnimation = unboxingAnimation.name;

        return unboxingAnimation.duration;
      })
      .then((waitFor) => delay(waitFor))
      .then(() => {
        this.winItemAnimation = '';
        this.winItemAnimationIndex = -1;
        this.resetSpin();

        // freebox
        if (this.isFree) {
          this.spinnerConfig.disabled = true;
        }
      });

    this.winItems.forEach(item => {
      window.analytics.track('Item Won', {
        ProductNameWon: item.item.name,
        ProductIDWon: item.item._id,
        AmountWon: item.item.value
      });
    });
  }

  itemId(index: number, item: any) {
    return item && item._id;
  }

  randomIndex(c: number, max?: number) {
    if (max > 0) {
      return Math.floor(Math.random() * Math.min(c, max));
    }

    return Math.floor(Math.random() * c);
  }

  generateIndex() {
    const i = Math.floor(Math.random() * (71 - 61 + 1)) + 71;
    if (this.winIndexes.includes(i)) {
      return this.generateIndex();
    } else {
      this.winIndexes.push(i);
      return i;
    }
  }

  shuffle(array: any[]) {
    const a = [...array];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }

    return this.modifyOrder(a);
  }

  closeInsufficient(): void {
    this.isOpenInsufficient = false;
  }

  modifyOrder(array: any[]) {
    const replaceItemsCount = Math.round(Math.random() * 3);
    const replaceItemsIndexes = [];

    const getIndex = () => {
      const i = Math.round(Math.random() * (6 - 2) + 2);
      if (!replaceItemsIndexes.includes(i)) {
        replaceItemsIndexes.push(i);
        return i;
      }

      return getIndex();
    };

    for (let i = 0; i < replaceItemsCount; i++) {
      const _highItemIndex = Math.round(
        Math.random() * Math.min(this.caseItems.length - 1, 3)
      );
      const idx = getIndex();
      array.splice(idx, 1, this.caseItems[_highItemIndex]);
    }

    return array;
  }

  resetSpin(): void {
    this.spinner = [];
    for (let i = 0; i < this.casesQuantity; i++) {
      this.spinner = [
        ...this.spinner,
        {
          style: this.initialStyle,
          items: this.shuffle(this.originalItems)
        }
      ];
    }

    this.stopAudio();
    this.winIndexes = [];
    this.spinnerConfig.disabled = false;
    this.spinnerConfig.loading = false;
    this.getUnboxDisabledState();
  }

  resetUnboxing(): void {
    if (!this.unboxing) {
      return;
    }

    this.store.dispatch(new fromCases.ResetUnboxingCase());
  }

  startDailyCaseTimer() {
    if (this.dailyCase.timer) {
      clearInterval(this.dailyCase.timer);
    }

    if (!this.user) {
      return;
    }

    this.dailyCase.timer = setInterval(() => {
      const date = new Date();
      this.dailyCase.text = `${23 - date.getUTCHours()}:${59 -
        date.getUTCMinutes()}:${60 - date.getUTCSeconds()}`;
    }, 1000);
  }

  subscribeToUserInfo() {
    this._user$ = this.store.pipe(select(fromAuth.selectUser));

    this._user$.pipe(takeUntil(this.unsubscribe$)).subscribe((user: User) => {
      this.user = user;

      if (user && user.lastDailyCaseOpened) {
        const lastOpenedDate = new Date(user.lastDailyCaseOpened).getUTCDate();
        const lastOpenedMonth = new Date(
          user.lastDailyCaseOpened
        ).getUTCMonth();
        const currentDate = new Date().getUTCDate();
        const currentMonth = new Date().getUTCMonth();

        if (
          lastOpenedDate === currentDate &&
          lastOpenedMonth === currentMonth
        ) {
          this.isDailyExpired = true;
          this.startDailyCaseTimer();
        } else {
          this.isDailyExpired = false;
        }
      }
    });
  }

  viewDescription(id: string): void {
    this.itemDetails$.pipe(take(1)).subscribe(item => {
      if (!item || (item && item._id !== id)) {
        this.store.dispatch(new fromCases.GetItemDetails(id));
      }
    });

    this.store.dispatch(new fromCases.OpenDescriptionModal());
  }

  getAllPrice(): number {
    let price = 0;
    this.winItems.forEach(item => {
      const isBy = this.soldItems.some(sold => sold === item.userItem._id);
      if (!isBy) {
        price += item.item.value;
      }
    });
    return price;
  }

  onToggleAudio(isAudioPlay: boolean): void {
    this.isAudioPlay = isAudioPlay;
    this.audio.volume = isAudioPlay ? 1 : 0;
  }

  stopAudio(): void {
    this.audio.pause();
    this.audio.currentTime = 0;
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();

    if (this.audio.currentTime > 0) {
      this.stopAudio();
    }

    if (this.dailyCase.timer) {
      clearInterval(this.dailyCase.timer);
    }

    this._caseCount$.pipe(take(1)).subscribe(count => {
      if (this.router.routerState.snapshot.url.indexOf('provably-fair') > -1) {
        return this.store.dispatch(
          new fromCases.SetCaseCount(this.casesQuantity)
        );
      }

      if (count > 1) {
        this.store.dispatch(new fromCases.SetCaseCount(1));
      }

      this.resetUnboxing();
    });
    this.store.dispatch(new fromLayout.EnableLiveFeed(true));
  }
}
