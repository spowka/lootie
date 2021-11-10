import { LeaderBoardDataItem } from 'src/app/shared/models';
import { Component, OnInit, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { switchMap, tap, take } from 'rxjs/operators';

export interface Time {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

@Component({
  selector: 'app-leaders-wins',
  templateUrl: './leaders-wins.component.html',
  styleUrls: ['./leaders-wins.component.scss'],
})
export class LeadersWinsComponent implements OnInit, OnChanges, OnDestroy {
  @Input() leaders: LeaderBoardDataItem[];

  @Input() endDate: string;

  public timeToDo: Time;

  private subscription: Subscription = new Subscription();

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['leaders'] &&
      changes['leaders'].currentValue &&
      changes['leaders'].currentValue.length > 0) {
      this.changeLeadersItems();
    }

    if (changes['endDate'] && changes['endDate'].currentValue) {
      this.timer(new Date(this.endDate));
    }
  }

  private changeLeadersItems(): void {
    this.leaders.sort((item) => {
      let index = 0;

      switch (item.ranking) {
        case 3:
          index = 1;
          break;
        case 2:
          index = -1;
          break;
        default:
          index = 0;
          break;
      }

      return index;
    });
  }

  private createTimeObject(date: Date): void {
    const now = new Date().getTime();
    const distance = date.getTime() - now;

    const time: Time = {days: 0, hours: 0, minutes: 0, seconds: 0};
    time.days = Math.floor(distance / (1000 * 60 * 60 * 24));
    time.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    time.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    time.seconds = Math.floor((distance % (1000 * 60)) / 1000);
    this.timeToDo = time;
  }

  private timer(date: Date): void {
    this.subscription.add(
      interval(1000).subscribe(() => {
        this.createTimeObject(date);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
