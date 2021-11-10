import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { UnboxingsService } from 'src/app/unboxings/services/unboxings.service';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';


import * as fromRoot from 'src/app/@store';
import * as fromLayout from 'src/app/@store/layout';
import { NgxZendeskWebwidgetService } from 'ngx-zendesk-webwidget';

@Component({
  selector: 'app-unboxing-item',
  templateUrl: './unboxing-item.component.html',
  styleUrls: ['./unboxing-item.component.scss']
})
export class UnboxingItemComponent implements OnInit {
  @ViewChild('zoomImage', { static: false }) zoomImage: any;
  @Input() item;
  @Input() isImage: boolean;
  public color: string;

  public isZoom = false;
  public imageUrl: string;
  public videoUrl: string;
  public bkgImageUrl: string;
  public isMobile$: Observable<boolean>;

  constructor(
    private fromService: UnboxingsService,
    private store: Store<fromRoot.State>,
    public dialog: MatDialog,
    private _ngxZendeskWebwidgetService: NgxZendeskWebwidgetService
  ) {
    this.color = this.fromService.generateColor();
    this.isMobile$ = this.store.pipe(select(fromLayout.selectIsMobile));
  }

  ngOnInit() {
    if (this.isImage) {
      this.imageUrl =
      `assets/images/unboxings/${this.item.id}-${this.item.country}-${this.item.itemName}-${this.item.boxName}.${this.item.expansion}`;
      this.bkgImageUrl = `url('${this.imageUrl}')`;
    } else {
      this.videoUrl =
      `assets/videos/unboxings/${this.item.id}-${this.item.country}-${this.item.itemName}-${this.item.boxName}.${this.item.expansion}`;
    }
  }

  public toggleZoom(value: boolean): void {
    this._ngxZendeskWebwidgetService.zE('webWidget', 'hide');
    const dialog = this.dialog.open(this.zoomImage, {
      panelClass: 'zoom-image-container'
    });
    dialog.afterClosed().subscribe(a => {
      this._ngxZendeskWebwidgetService.zE('webWidget', 'show');
    });
  }
}
