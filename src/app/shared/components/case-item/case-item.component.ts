import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { CloseScrollStrategy } from '@angular/cdk/overlay';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as fromAuth from 'src/app/auth/@store';
import * as fromRoot from 'src/app/@store';

@Component({
  selector: 'app-case-item',
  templateUrl: './case-item.component.html',
  styleUrls: ['./case-item.component.scss']
})
export class CaseItemComponent implements OnInit {

  @Input() item: any;
  @Input() smallView = false;
  @Input() spinnerView = false;
  @Input() descriptionView = false;
  @Input() showTitle = true;
  @Input() withChangedTitle = false;
  @Input() showFooter = true;
  @Input() showChoosen = true;
  @Input() isSelected = false;
  @Input() isCreateCase = false;
  @Input() isInventory = true;
  @Input() isSelectedImg = true;
  @Input() isLoading = false;
  @Input() isImageBackground = false;
  @Input() showOdds = false;
  @Input() itemWidth: string;
  @Input() isMobile = false;
  @Input() selectedItems: any[] = [];

  @Output() addToSelected: EventEmitter<any> = new EventEmitter();
  @Output() removeFromSelected: EventEmitter<any> = new EventEmitter();
  @Output() view: EventEmitter<any> = new EventEmitter();

  public isMobile$: Observable<boolean>;

  public isLoggedIn$: Observable<boolean>;

  constructor(
    private store: Store<fromRoot.State>
  ) {
    this.isLoggedIn$ = this.store.pipe(select(fromAuth.selectIsLoggedIn));
    this.isMobile$ = this.store.pipe(select(fromRoot.selectIsMobile));
  }

  ngOnInit() {
  }

  toHexColor(color: string): string {
    return `#${color}`;
  }

  selectItem(): void {
    if (!this.isSelected) {
      this.addToSelected.emit(this.item);
      return;
    }

    this.removeFromSelected.emit(this.item);
  }

  viewDescription(): void {
    this.view.emit(this.item._id);
    window.analytics.track('Box Viewed', {
      BoxNameViewed: this.item.name,
      BoxIDViewed: this.item._id
    });
  }
}
