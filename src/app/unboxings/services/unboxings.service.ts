import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UnboxingsService {
  private prevColor: string;
  private readonly caseColors = ['#f2893a', '#19bd66', '#9d63d2', '#f34748', '#4ec1e3'];

  constructor() { }

  generateColor() {
    const color = this.caseColors[Math.floor(Math.random() * this.caseColors.length)];
    if (color === this.prevColor) {
      return this.generateColor();
    }

    this.prevColor = color;
    return color;
  }
}
