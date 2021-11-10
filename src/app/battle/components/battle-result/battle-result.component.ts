import { Component, AfterViewInit, Input, ViewChild, ElementRef, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import initConfetti from 'src/assets/animations/confetti.js';
import { trigger, transition, style, animate } from '@angular/animations';

interface BattleResult {
  isWin: boolean;
  rounds: { value: number; isWin: boolean }[];
}

@Component({
  selector: 'app-battle-result',
  templateUrl: './battle-result.component.html',
  styleUrls: ['./battle-result.component.scss'],
  animations: [
    trigger('fadeIn', [transition(':enter', [
      style({ opacity: 0, height: 0, margin: 0 }), animate('500ms 3s')
    ])])
  ]
})
export class BattleResultComponent implements AfterViewInit {
  @Input() result: BattleResult;
  @Input() totalWinning: number;

  @Output() countDone: EventEmitter<any> = new EventEmitter();
  @Output() countStep: EventEmitter<number> = new EventEmitter();

  @ViewChild('canvas', { static: false }) public canvas: ElementRef;

  public i = 0;
  public round: { value: number; isWin: boolean };
  public countUpOptions = {
    startVal: 0,
    decimalPlaces: 2,
    duration: 1.5,
    useEasing: false,
    prefix: '$ ',
  };

  constructor() { }

  public ngAfterViewInit() {
    if (this.result.rounds.length >= 10) {
      this.countUpOptions.duration = 0.7;
    }

    this.animateRounds();
  }

  public animateRounds() {
    this.round = this.result.rounds[this.i];
    if (this.round.isWin) { this.countStep.emit(this.i); }
    const interval = setInterval(_ => {
      if (this.result.rounds[this.i + 1]) {
        this.i++;
        this.countUpOptions.startVal = this.round.value;
        this.round = this.result.rounds[this.i];
        if (this.round.isWin) { this.countStep.emit(this.i); }
      } else {
        clearInterval(interval);
        if (this.round.isWin) {
          this.countDone.emit();
          this.animateConfetti();
        }
      }
    }, this.result.rounds.length >= 10 ? 1000 : 2000);
  }

  public animateConfetti() {
    const canvasEl = this.canvas.nativeElement;
    initConfetti(canvasEl);
  }
}
