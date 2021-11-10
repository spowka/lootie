import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';

const DELAY = 330;

@Component({
  selector: 'app-loader-routing-bar',
  templateUrl: './loader-routing-bar.component.html',
  styleUrls: ['./loader-routing-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderRoutingBarComponent implements OnInit {
  value$ = new BehaviorSubject<number>(0);

  set value(value: number) {
    console.log('SET', value);
    this._value = value;
    this.value$.next(value);
  }

  get value() {
    return this._value;
  }

  private _value = 0;
  private _timer;

  constructor(private router: Router) {
    router.events.subscribe(ev => {
      if (ev instanceof NavigationStart) {
        this.start();
      } else if (ev instanceof NavigationEnd || ev instanceof NavigationCancel || ev instanceof NavigationError) {
        this.complete();
      }
    });
  }

  ngOnInit() {
  }

  private start() {
    this.value = 1;
    this._timer = setTimeout(() => this.next(), DELAY);
  }

  private complete() {
    this.value = 100;
    clearTimeout(this._timer);
    setTimeout(() => this.value = 0, DELAY * 1.3);
  }

  private increment() {
    this.value = this.value + this.getIncrement();
  }

  private next() {
    if (this.value < 99) {
      this.increment();
      this._timer = setTimeout(() => this.next(), DELAY);
    }
  }

  private getIncrement() {
    const value = this.value;

    if (value < 24) {
      return Math.random() * (5 - 3 + 1) + 3;
    } else if (value < 60) {
      return Math.random() * 3;
    } else if (value < 80) {
      return Math.random() * 2;
    } else {
      return 0.5;
    }
  }
}
