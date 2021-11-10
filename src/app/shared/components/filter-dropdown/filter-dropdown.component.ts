import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter-dropdown',
  templateUrl: './filter-dropdown.component.html',
  styleUrls: ['./filter-dropdown.component.scss']
})
export class FilterDropdownComponent implements OnInit {
  @Input() label: string = '';
  @Input() options: any[] = [];
  @Input() value:string = '';
  @Output() valueChange: EventEmitter<string>;

  constructor() {
    this.valueChange = new EventEmitter<string>();
  }

  ngOnInit() {
  }

  selectionChange(ev: any) {
    this.valueChange.emit(ev.value);
  }

}
