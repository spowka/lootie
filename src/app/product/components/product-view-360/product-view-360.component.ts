import { Component, OnInit, ViewChild, Input, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-product-view-360',
  templateUrl: './product-view-360.component.html',
  styleUrls: ['./product-view-360.component.scss']
})
export class ProductView360Component implements OnInit {
  @ViewChild('sliderBar', { static: false }) sliderBar: ElementRef;
  sliderConfig = {
    min: 1,
    max: 10,
    start: 2,
    barColor: '',
    dotColor: '',
    filledBarColor: '',
    barWidth: ''
  };
  public percentage: any;
  public dot;
  public filledBar;
  public initMouseMove;

  public images = [
    'https://cdn.zeplin.io/5e91836acb6b8c20e5f97204/assets/b15eb0fa-2ce2-4ff2-89e1-b905b521006e@3x.png',
    'https://cdn.zeplin.io/5e91836acb6b8c20e5f97204/assets/423f0800-81ac-40ee-8f17-031b02e87f41@3x.png',
    'https://cdn.zeplin.io/5e91836acb6b8c20e5f97204/assets/604669ff-1ae2-4d95-8b66-5aea9fe90d91@3x.png',
    'https://cdn.zeplin.io/5e91836acb6b8c20e5f97204/assets/3d691554-c168-4c5e-a40d-ef4086171db4@3x.png'
  ];

  public previewImage = 'https://cdn.zeplin.io/5e91836acb6b8c20e5f97204/assets/c3c90fc9-916f-417c-a8e8-0c99bade04e3.png';

  constructor(private elemRef: ElementRef) { }

  ngOnInit() {
    this.initMouseMove = this.onMouseMoveOnSlider.bind(this);

    this.percentage = (this.sliderConfig.start / this.sliderConfig.max) * 100;

    this.dot = this.sliderBar.nativeElement.querySelector('.slider-bar__movable-thumb-dot');
    this.filledBar = this.sliderBar.nativeElement.querySelector('.slider-bar__filled');

    this.setSliderUIValues(this.percentage, this.sliderConfig);
  }

  onMouseMoveOnSlider(event: MouseEvent) {

    if (this.sliderBar) {

      const sliderLeftPos = this.sliderBar.nativeElement.offsetLeft;
      const sliderRightPos = sliderLeftPos + this.sliderBar.nativeElement.offsetWidth;
      const mouseLeft = event.pageX;
      if (mouseLeft < sliderLeftPos) {
        this.percentage = 0;
      } else if (mouseLeft > sliderRightPos) {
        this.percentage = 100;
      } else {
        this.percentage = ((event.pageX - sliderLeftPos) / this.sliderBar.nativeElement.offsetWidth) * 100;
      }

      this.setSliderUIValues(this.percentage, null);

      return parseInt(this.percentage, 10);
    }
  }

  onMouseDown(event) {
    document.addEventListener('mousemove', this.initMouseMove);
  }

  @HostListener('window:mouseup', ['$event'])
  onMouseUp(event) {
    document.removeEventListener('mousemove', this.initMouseMove);
  }

  onClick(event) {
    this.onMouseMoveOnSlider(event);
  }

  setSliderUIValues(percentage, sliderConfig) {
    this.dot.style.left = percentage + '%';
    this.filledBar.style.width = percentage + '%';

    if (sliderConfig) {
      if (sliderConfig.barColor) {
        this.sliderBar.nativeElement.style.backgroundColor = sliderConfig.barColor;
      }
      if (sliderConfig.barWidth) {
        this.sliderBar.nativeElement.style.width = sliderConfig.barWidth;
      }
      if (sliderConfig.dotColor) {
        this.dot.style.backgroundColor = sliderConfig.dotColor;
      }
      if (sliderConfig.filledBarColor) {
        this.filledBar.style.backgroundColor = sliderConfig.filledBarColor;
      }
    }
  }
}
