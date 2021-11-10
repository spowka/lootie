import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-battle-countdown',
  templateUrl: './battle-countdown.component.html',
  styleUrls: ['./battle-countdown.component.scss']
})
export class BattleCountdownComponent implements OnInit, OnDestroy {
  @Input() createdAt: string;
  @Input() showFrom: string;

  public timerLimit = 120; // minutes
  public startOnLimit = 30; // minutes

  public isVisible = false;

  public timerId = null;
  public waitingTimerId = null;

  public currentTime: moment.Moment;
  public endTime: moment.Moment;
  public startOn: moment.Moment;

  public hour = 0;
  public minute = 0;
  public second = 0;

  constructor() { }

  ngOnInit() {
    this.currentTime = moment();
    this.endTime = moment(this.createdAt).add(this.timerLimit, 'minutes');
    this.startOn = moment(this.createdAt).add(this.startOnLimit, 'minutes');

    if (this.currentTime.isBefore(this.endTime)) {
      if (this.currentTime.isAfter(this.startOn) || this.currentTime.isSame(this.startOn)) {
        this.isVisible = true;
        this.startCountDown();
      } else {
        this.waitingTimerId = setInterval(_ => {
          this.currentTime = moment();
          if (this.currentTime.isAfter(this.startOn) || this.currentTime.isSame(this.startOn)) {
            clearInterval(this.waitingTimerId);
            this.isVisible = true;
            this.startCountDown();
          }
        }, 60 * 1000); // check every 5 minutes
      }
    }
  }

  startCountDown() {
    this.timerId = setInterval(_ => {
      this.currentTime = moment();

      if (this.currentTime.isAfter(this.endTime)) {
        clearInterval(this.timerId);
      }

      const __duration = moment.duration(this.endTime.diff(this.currentTime));

      this.hour = __duration.hours();
      this.minute = __duration.minutes();
      this.second = __duration.seconds();
    }, 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.timerId);
    clearInterval(this.waitingTimerId);
  }


  // ngOnInit(): void {
  //   this.itemsWithParsedData.map(data => {
  //     this.goLiveData = moment(data.liveClassInfo.goLiveDate).format("hh:mm:ss a");

  //     this.isLiveNow = moment(this.currentTime).isBetween(moment(this.goLiveData).subtract(60, 'minutes'), moment(this.goLiveData).add(480, 'minutes'));
  //     this.isComingLive = moment(this.currentTime).isSameOrBefore(moment(this.goLiveData).subtract(60, 'minutes'));
  //     this.isWatch = moment(this.currentTime).isSameOrAfter(moment(this.goLiveData).add(480, 'minutes'));
  //   })
  // }

}
