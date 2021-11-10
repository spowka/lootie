import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter-toggle',
  templateUrl: './filter-toggle.component.html',
  styleUrls: ['./filter-toggle.component.scss']
})
export class FilterToggleComponent implements OnInit {
  @Input() label: string = '';
  @Input() value: string = '';
  @Input() expanded: boolean = false;
  @Output() onToggle: EventEmitter<boolean>;

  constructor() {
    this.onToggle = new EventEmitter<boolean>();
  }

  ngOnInit() {
  }

  toggle() {
    this.onToggle.emit(!this.expanded);
  }
}
