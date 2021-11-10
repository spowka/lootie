import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { CloseScrollStrategy } from '@angular/cdk/overlay';

@Component({
  selector: 'app-spinner-item',
  templateUrl: './spinner-item.component.html',
  styleUrls: ['./spinner-item.component.scss']
})
export class SpinnerItemComponent implements OnInit {

  @Input() item: any;
  @Input() smallView = false;
  @Input() spinnerView = false;
  @Input() isMobile = false;
  @Input() itemWidth: string;

  ngOnInit() {
  }

  toHexColor(color: string): string {
    return `#${color}`;
  }
}
