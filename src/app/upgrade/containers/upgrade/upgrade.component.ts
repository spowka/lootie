import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Observable, Subject } from 'rxjs';
import { share, tap, takeUntil, take, skip } from 'rxjs/operators';

import { Store, select } from '@ngrx/store';
import * as fromRoot from 'src/app/@store';
import * as fromAuth from 'src/app/auth/@store';
import * as fromLayout from 'src/app/@store/layout';
import * as fromUpgrade from 'src/app/upgrade/@store/upgrade';
import * as fromProvablyFair from 'src/app/@store/provably-fair';
import { UpgradeService } from 'src/app/upgrade/services/upgrade.service';
import { AuthService } from 'src/app/auth/services/auth.service';

import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatDialog } from '@angular/material';
import { DialogSiteItemsComponent, DialogInventoryComponent, DialogGameRulesComponent } from 'src/app/upgrade/components';

import { Pagination, Filters, SiteItemsModel, InventoryItemsModel } from 'src/app/shared/models';
import { UpgradingModel, UpgradeConfigModel } from 'src/app/upgrade/models';

import { upgradeAnimations } from './upgrade.animations';

@Component({
  selector: 'app-upgrade',
  templateUrl: './upgrade.component.html',
  styleUrls: ['./upgrade.component.scss'],
  animations: upgradeAnimations
})
export class UpgradeComponent implements OnInit, OnDestroy {
  public selectedSiteItems: SiteItemsModel[] = [];
  public selectedSiteItemsTotal = 0;

  public selectedInventoryItems: InventoryItemsModel[] = [];
  public selectedInventoryItemsTotal = 0;

  public upgradingResult: any;

  public upgradeState = 'off';

  public winChanceDirection: 'UP' | 'DOWN' = 'DOWN';

  public winChance = 0;

  public rollOver = 0;

  public multiplier = 2;

  public animations = {
    borders: 'stop',
    button: 'stop',
    labels: 'stop',
    actions: 'stop',
  };

  public move = {
    lTranslate: 'translate(260px, 296px)',
    rTranslate: 'translate(-260px, 296px)',
    roundButton: '184px',
  };

  public pagination: Pagination = {
    offset: 0,
    limit: 15,
  };

  public filters: Filters = {
    orderBy: 'value',
    orderDir: 'asc',
  };

  public selectedMultiplier = 2;

  public isLoggedIn = false;

  public isMobile$: Observable<boolean>;

  public isLandscape$: Observable<boolean>;

  public readonly multipliers = [1.5, 2, 5, 10, 20];

  private upgradeSubject$: Subject<{ previous: string, next: string }> = new Subject();

  private clientSeed: string;

  private _clientSeed$: Observable<string>;

  private _siteItems$: Observable<SiteItemsModel[]>;
  private _selectedSiteItems$: Observable<SiteItemsModel[]>;

  private _selectedInventoryItems$: Observable<InventoryItemsModel[]>;

  private _upgrading$: Observable<UpgradingModel>;

  private _upgradingResult$: Observable<any>;

  private _upgradeConfig$: Observable<UpgradeConfigModel>;

  private _isLoggedIn$: Observable<boolean>;

  private unsubscribe$: Subject<void> = new Subject();

  private readonly HOUSE_EDGE = 5;

  public winAudio: HTMLAudioElement;
  public loseAudio: HTMLAudioElement;
  public risingAudio: HTMLAudioElement;

  constructor(
    public dialog: MatDialog,
    private store: Store<fromRoot.State>,
    private router: Router,
    private toast: ToastrService,
    private authService: AuthService,
    private upgradeService: UpgradeService,
    private titleService: Title,
  ) {
    this._siteItems$ = this.store.pipe(select(fromUpgrade.selectSiteItems));
    this._selectedSiteItems$ = this.store.pipe(select(fromUpgrade.selectSelectedSiteItems));
    this._selectedInventoryItems$ = this.store.pipe(select(fromUpgrade.selectSelectedInventoryItems));
    this._upgradingResult$ = this.store.pipe(select(fromUpgrade.selectUpgradingResult));
    this._upgrading$ = this.store.pipe(select(fromUpgrade.selectUpgrading));
    this._upgradeConfig$ = this.store.pipe(select(fromUpgrade.selectConfig));
    this._clientSeed$ = this.store.pipe(select(fromProvablyFair.selectClientSeed));
    this._isLoggedIn$ = this.store.pipe(select(fromAuth.selectIsLoggedIn));
    this.isMobile$ = this.store.pipe(select(fromRoot.selectIsMobile));

    this.titleService.setTitle('Upgrade | Get Even Better Items Than Before');

    this.isMobile$.pipe(takeUntil(this.unsubscribe$)).subscribe(isMobile => {
      const width = window.innerWidth;
      if (width <= 767 && width > 350) {
        this.move.lTranslate = 'translate(90.5px, 362px)';
        this.move.rTranslate = 'translate(-90.5px, 362px)';
        this.move.roundButton = '135px';
      } else if (width <= 350) {
        this.move.lTranslate = 'translate(70.5px, 369px)';
        this.move.rTranslate = 'translate(-70.5px, 369px)';
        this.move.roundButton = '135px';
      }
    });

    this._isLoggedIn$.pipe(takeUntil(this.unsubscribe$)).subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;

      if (isLoggedIn && this.authService.isTokenExpired()) {
        this.store.dispatch(new fromAuth.Logout());
        return;
      }
    });

    this._clientSeed$.pipe(takeUntil(this.unsubscribe$))
      .subscribe((seed) => {
        this.clientSeed = seed;
      });

    this._selectedSiteItems$.pipe(takeUntil(this.unsubscribe$)).subscribe((siteItems: SiteItemsModel[]) => {
      this.selectedSiteItems = siteItems;
      this.onSelectedSiteItemsChange();
    });

    this._selectedInventoryItems$.pipe(takeUntil(this.unsubscribe$)).subscribe((inventoryItems: InventoryItemsModel[]) => {
      this.selectedInventoryItems = inventoryItems;
      this.onSelectedInventoryItemsChange();
    });

    this._upgradingResult$.pipe(takeUntil(this.unsubscribe$)).subscribe((upgrading: any) => {
      this.upgradingResult = upgrading;
    });

    this._upgradeConfig$.pipe(takeUntil(this.unsubscribe$)).subscribe((config: UpgradeConfigModel) => {
      this.multiplier = config.multiplier;
      this.selectedMultiplier = config.selectedMultiplier;
      this.winChanceDirection = config.winChanceDirection;
      this.updateWinChance();
    });
  }

  ngOnInit() {
    this.onInstantUpgradeChange().subscribe();
    this.initAudio();
  }

  initAudio() {
    this.winAudio = new Audio('/assets/audio/win.wav');
    this.winAudio.load();
    this.loseAudio = new Audio('/assets/audio/lose.wav');
    this.loseAudio.load();
    this.risingAudio = new Audio('/assets/audio/rising.wav');
    this.risingAudio.load();
  }

  onChange(ob: MatSlideToggleChange): void {
    const upgrade = ob.checked ? 'on' : 'off';
    this.upgradeSubject$.next({ previous: this.upgradeState, next: upgrade });
  }

  onInstantUpgradeChange() {
    return this.upgradeSubject$.pipe(
      tap(({ next }) => this.upgradeState = next),
      share()
    );
  }

  onSelectedSiteItemsChange(): void {
    this.selectedSiteItemsTotal = 0;
    this.selectedSiteItems.map(siteItem => {
      this.selectedSiteItemsTotal += siteItem.value;
    });

    if (!this.selectedInventoryItems.length && this.selectedSiteItems.length) {
      this.multiplier = 0;
      this.selectedMultiplier = null;
    } else if (this.selectedInventoryItems.length && this.selectedSiteItems.length) {
      this.multiplier = +(this.selectedSiteItemsTotal / this.selectedInventoryItemsTotal).toFixed(2);
    }

    this.updateWinChance();
  }

  onSelectedInventoryItemsChange(): void {
    this.selectedInventoryItemsTotal = 0;
    this.selectedInventoryItems.map(inventory => {
      this.selectedInventoryItemsTotal += inventory.item.value;
    });

    if (this.selectedSiteItemsTotal && ((this.selectedSiteItemsTotal * 1.01) < this.selectedInventoryItemsTotal)) {
      this.multiplier = 2;
      this.selectedMultiplier = 2;
    }

    if (this.selectedInventoryItems.length && this.selectedMultiplier) {
      this.store.dispatch(new fromUpgrade.GetSuggestItem({
        price: this.selectedInventoryItemsTotal,
        multiplier: this.selectedMultiplier,
      }));
    } else if (this.selectedInventoryItems.length && !this.multipliers.includes(this.selectedMultiplier)) {
      this.multiplier = +(this.selectedSiteItemsTotal / this.selectedInventoryItemsTotal).toFixed(2);
    } else {
      this.store.dispatch(new fromUpgrade.SelectSiteItems([]));
      this.multiplier = 2;
      this.selectedMultiplier = 2;
    }

    this.updateWinChance();
  }

  onMultiplierChange(multiplier): void {
    this.multiplier = multiplier;
    this.selectedMultiplier = multiplier;


    if (this.selectedInventoryItems.length) {
      this.store.dispatch(new fromUpgrade.GetSuggestItem({
        price: this.selectedInventoryItemsTotal,
        multiplier: this.selectedMultiplier,
      }));
    }

    this._upgrading$.pipe(take(1)).subscribe(upgrading => {
      if (upgrading) {
        this.store.dispatch(new fromUpgrade.DeleteUpgrade(upgrading._id));
      }
    });

    this.updateWinChance();
  }

  openSelectInventoryDialog(): void {
    if (!this.isLoggedIn) {
      return this.store.dispatch(new fromLayout.OpenLoginModal());
    }

    if (this.animations.button !== 'stop') {
      return;
    }

    const dialogRef = DialogInventoryComponent.show(this.dialog);

    dialogRef.afterClosed().subscribe((isSelected: boolean) => {
      if (isSelected) {
        this._upgrading$.pipe(take(1)).subscribe(upgrading => {
          if (upgrading) {
            this.store.dispatch(new fromUpgrade.DeleteUpgrade(upgrading._id));
          }
        });
      }
    });
  }

  openSelectSiteItemsDialog(): void {
    if (!this.isLoggedIn) {
      return this.store.dispatch(new fromLayout.OpenLoginModal());
    }

    if (this.animations.button !== 'stop') {
      return;
    }

    const dialogRef = DialogSiteItemsComponent.show(this.dialog);

    dialogRef.afterClosed().subscribe((isCustomSelected: boolean) => {
      if (isCustomSelected) {
        this.selectedMultiplier = null;
        this._upgrading$.pipe(take(1)).subscribe(upgrading => {
          if (upgrading) {
            this.store.dispatch(new fromUpgrade.DeleteUpgrade(upgrading._id));
          }
        });
      }
    });
  }

  openRules(): void {
    // DialogGameRulesComponent.show(this.dialog);
  }

  upgradeSkin(): void {
    if (!this.selectedInventoryItems.length || !this.selectedSiteItems.length) {
      return;
    }

    if (this.animations.borders === 'start' || this.animations.actions === 'start') {
      return;
    }

    if (this.upgradeState === 'on') {
      this.instantUpgrade();
      return;
    }

    const userItems = [];
    const targetItems = [];
    this.selectedInventoryItems.map((inventoryItems => {
      userItems.push(inventoryItems._id);
    }));

    this.selectedSiteItems.map((siteItems => {
      targetItems.push(siteItems._id);
    }));

    this.animations.borders = 'start';
    this.animations.button = 'start';
    this.animations.actions = 'start';
    this.animations.labels = 'start';

    this._upgrading$.pipe(take(1)).subscribe(async upgrading => {
      if (upgrading) {
        this.store.dispatch(new fromUpgrade.RollAnUpgrade(upgrading._id));
        return;
      }

      const body = {
        userItems: userItems,
        targetItems: targetItems,
        multiplier: this.selectedMultiplier || this.multiplier,
        winChanceDirection: this.winChanceDirection,
        seed: this.clientSeed,
      };
      this.store.dispatch(new fromUpgrade.CreateRollUpgrade(body));
      await new Promise(resolve => setTimeout(resolve, 1000));
      this.risingAudio.play();
    });
  }

  instantUpgrade() {
    const userItems = [];
    const targetItems = [];
    this.selectedInventoryItems.map((inventoryItems => {
      userItems.push(inventoryItems._id);
    }));

    this.selectedSiteItems.map((siteItems => {
      targetItems.push(siteItems._id);
    }));

    this.animations.actions = 'start';
    this.animations.button = 'instant';

    this._upgrading$.pipe(take(1)).subscribe(upgrading => {
      if (upgrading) {
        this.upgradeService.rollAnUpgrade(upgrading._id).subscribe(res => {
          if (res['data']) {
            this.store.dispatch(new fromUpgrade.RollAnUpgradeSuccess(res['data']));
            if (res['data'].isWin) {
              this.animations.button = 'win';
            } else {
              this.animations.button = 'lose';
            }
            this.animations.borders = 'instant';
          }
        });
        return;
      }

      const body = {
        userItems: userItems,
        targetItems: targetItems,
        multiplier: this.selectedMultiplier || this.multiplier,
        winChanceDirection: this.winChanceDirection,
        seed: this.clientSeed,
      };
      this.upgradeService.createUpgrade(body).subscribe(upgradeingRes => {
        this.upgradeService.rollAnUpgrade(upgradeingRes['data']._id).subscribe(winRes => {
          if (winRes['data']) {
            this.store.dispatch(new fromUpgrade.RollAnUpgradeSuccess(winRes['data']));
            if (winRes['data'].isWin) {
              this.animations.button = 'win';
            } else {
              this.animations.button = 'lose';
            }
            this.animations.borders = 'instant';
          }
        });
      });
    });
  }

  onAnimationDone(state): void {
    this.risingAudio.pause();
    this.risingAudio.currentTime = 0;

    if (state.fromState === 'stop' && state.toState === 'start') {
      if (this.upgradingResult && this.upgradingResult.isWin) {
        this.winAudio.play();
        this.animations.button = 'win';
      } else if (this.upgradingResult && !this.upgradingResult.isWin) {
        this.loseAudio.play();
        this.animations.button = 'lose';
      } else {
        this.toast.error('Something went wrong');
      }
      this.animations.borders = 'reset';
    }

    if (state.toState === 'reset' || state.toState === 'instant') {
      this.animations = {
        borders: 'stop',
        button: 'stop',
        labels: 'stop',
        actions: 'stop',
      };

      if (this.upgradingResult) {
        if (this.upgradingResult.isWin) {
          this.store.dispatch(new fromUpgrade.UpdateInventoryItems({
            add: this.upgradingResult.newInventoryItems,
            remove: this.selectedInventoryItems,
          }));
          this.store.dispatch(new fromUpgrade.SelectInventoryItems(this.upgradingResult.newInventoryItems));
          if (!this.selectedMultiplier) {
            this.store.dispatch(new fromUpgrade.SelectSiteItems([]));
          }
        } else {
          this.store.dispatch(new fromUpgrade.UpdateInventoryItems({
            add: [],
            remove: this.selectedInventoryItems,
          }));
          this.store.dispatch(new fromUpgrade.SelectInventoryItems([]));
        }
      } else {
        this.store.dispatch(new fromUpgrade.SelectInventoryItems([]));
      }
    }
  }

  goToProvablyFair(): void {
    if (this.animations.button !== 'stop') {
      return;
    }

    if (this.selectedInventoryItems.length && this.selectedSiteItems.length) {
      this._upgrading$.pipe(take(1)).subscribe(upgrading => {
        if (!upgrading) {
          const userItems = [];
          const targetItems = [];
          this.selectedInventoryItems.map((inventoryItems => {
            userItems.push(inventoryItems._id);
          }));

          this.selectedSiteItems.map((siteItems => {
            targetItems.push(siteItems._id);
          }));

          this.store.dispatch(new fromUpgrade.CreateUpgrade({
            userItems: userItems,
            targetItems: targetItems,
            multiplier: this.selectedMultiplier || this.multiplier,
            winChanceDirection: this.winChanceDirection,
            seed: this.clientSeed,
          }));

          this.store.dispatch(new fromUpgrade.UpdateConfig({
            multiplier: this.multiplier,
            selectedMultiplier: this.selectedMultiplier,
            winChanceDirection: this.winChanceDirection,
          }));
        }
      });
      this.store.dispatch(new fromProvablyFair.SetUrlFrom(this.router.url));
    }

    this.router.navigate(['/provably-fair/upgrades']);
  }

  updateWinChance() {
    this.winChance = this.multiplier ? +((100 / this.multiplier) * (1 - this.HOUSE_EDGE / 100)).toFixed(2) : 0;
    this.rollOver = 100 - this.winChance;
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.winAudio.pause();
    this.winAudio.currentTime = 0;
    this.loseAudio.pause();
    this.loseAudio.currentTime = 0;
    this.risingAudio.pause();
    this.risingAudio.currentTime = 0;
  }
}
