import {
  Component, OnInit, Input, OnChanges, SimpleChanges,
  ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef, Renderer2
} from '@angular/core';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { MatSelectChange } from '@angular/material';

import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { Store, select } from '@ngrx/store';
import * as fromRoot from 'src/app/@store';

import { NavbarItem } from '../../models/index';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit, OnChanges, OnDestroy {

  @Input() nav: NavbarItem[];
  @Input() uppercase = true;
  @Input() border = false;

  private unsubscribe$: Subject<void> = new Subject();

  activeNavItem: NavbarItem;
  isMobile$: Observable<boolean>;

  constructor(
    private store: Store<fromRoot.State>,
    private router: Router,
    private cd: ChangeDetectorRef,
    private renderer: Renderer2
  ) {
    this.isMobile$ = this.store.pipe(select(fromRoot.selectIsMobile));
  }

  ngOnInit() {
    this.subscribeToRouter();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.nav && changes.nav.currentValue && changes.nav.currentValue.length) {
      this.updateNavState();
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }


  selectNavItem(data: MatSelectChange) {
    const navItem: NavbarItem = data.value;
    if (!navItem.url) {
      return;
    }
    this.router.navigate([navItem.url]);
  }

  private updateNavState(): void {
    this.nav.forEach(item => {

      item.isActive = this.isActiveRoute(item.url);

      if (item.isActive) { this.activeNavItem = item; }
      if (!item.url) { item.disabled = true; }
    });
    this.cd.detectChanges();
  }

  private subscribeToRouter(): void {
    this.router.events
      .pipe(
        takeUntil(this.unsubscribe$),
        filter((event: RouterEvent) => event instanceof NavigationEnd)
      )
      .subscribe(res => this.updateNavState());
  }

  private isActiveRoute(url: string): boolean {
    return this.router.url === url;
  }
}
