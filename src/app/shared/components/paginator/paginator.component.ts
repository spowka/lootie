import {
  Component,
  OnInit,
  OnChanges,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements OnInit, OnChanges {
  @Input() page: number = 1;
  @Input() totalPages: number = 1;
  @Output() pageChange: EventEmitter<number>;

  pages: number[] = [];

  constructor() {
    this.pageChange = new EventEmitter<number>();
  }

  ngOnInit() {
    this.updatePages();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.updatePages();
  }

  updatePages() {
    const pages = [];

    let start = Math.max(
      this.page < this.totalPages - 2 ? this.page - 1 : this.totalPages - 3,
      1
    );
    let end = Math.min(start < 3 ? 4 : this.page + 1, this.totalPages);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    if (start === 2) {
      pages.unshift(1);
    } else if (start > 2) {
      pages.unshift(-1);
      pages.unshift(1);
    }
    if (end === this.totalPages - 1) {
      pages.push(this.totalPages);
    } else if (end < this.totalPages - 1) {
      pages.push(-1);
      pages.push(this.totalPages);
    }

    this.pages = pages;
  }

  selectPage(p: number) {
    this.pageChange.emit(p);
  }

  previousPage() {
    this.pageChange.emit(Math.max(this.page - 1, 1));
  }

  nextPage() {
    this.pageChange.emit(Math.min(this.page + 1, this.totalPages));
  }
}
