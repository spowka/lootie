import { Component, ViewChild, ElementRef, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-battle-case-slider',
  templateUrl: './battle-case-slider.component.html',
  styleUrls: ['./battle-case-slider.component.scss'],
})
export class BattleCaseSliderComponent implements OnInit, AfterViewInit {
  public scroll = 0;
  public arrowRight = false;

  @ViewChild('slider', { read: ElementRef, static: false })
  public slider: ElementRef<any>;
  @ViewChild('sliderContent', { read: ElementRef, static: false })
  public sliderContent: ElementRef<any>;

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    const sliderWidth = this.slider.nativeElement.offsetWidth;
    const sliderContentWidth = this.sliderContent.nativeElement.offsetWidth;
    if (sliderContentWidth > sliderWidth) {
      this.arrowRight = true;
    }
  }

  public scrollRight() {
    const sliderWidth = this.slider.nativeElement.offsetWidth;
    const sliderContentWidth = this.sliderContent.nativeElement.offsetWidth;
    this.scroll = Math.min(this.scroll + sliderWidth / 3, sliderContentWidth);
    // this.slider.nativeElement.scrollTo({ left: this.scroll });
    if (this.scroll + sliderWidth >= sliderContentWidth) {
      this.arrowRight = false;
    } else if (!this.arrowRight && this.scroll + sliderWidth < sliderContentWidth) {
      this.arrowRight = true;
    }
  }

  public scrollLeft() {
    const sliderWidth = this.slider.nativeElement.offsetWidth;
    const sliderContentWidth = this.sliderContent.nativeElement.offsetWidth;
    this.scroll = Math.max(this.scroll - sliderWidth / 3, 0);
    // this.slider.nativeElement.scrollTo({ left: this.scroll });
    if (!this.arrowRight && this.scroll + sliderWidth < sliderContentWidth) {
      this.arrowRight = true;
    }
  }
}
