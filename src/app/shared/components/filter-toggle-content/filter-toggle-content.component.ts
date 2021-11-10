import {
  Component,
  Input,
  OnChanges,
  AfterViewInit,
  ViewChild,
  SimpleChanges,
  ElementRef,
} from '@angular/core';

@Component({
  selector: 'app-filter-toggle-content',
  templateUrl: './filter-toggle-content.component.html',
  styleUrls: ['./filter-toggle-content.component.scss'],
})
export class FilterToggleContentComponent implements OnChanges, AfterViewInit {
  @Input() expanded: boolean = false;

  @ViewChild('content', { static: false }) contentEl: ElementRef<HTMLDivElement>;

  elementHeight: number = 0;

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes.expanded &&
      changes.expanded.currentValue &&
      this.contentEl &&
      this.contentEl.nativeElement
    ) {
      this.elementHeight = this.contentEl.nativeElement.clientHeight + 60;
    } else {
      this.elementHeight = 0;
    }
  }

  ngAfterViewInit() {
    if (this.expanded) {
      this.elementHeight = this.contentEl.nativeElement.clientHeight + 60;
    }
  }
}
