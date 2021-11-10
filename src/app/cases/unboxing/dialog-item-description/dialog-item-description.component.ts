import { Component, OnInit, Inject, OnDestroy, ViewChild, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material';

import { Observable, Subject } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';

import { select, Store } from '@ngrx/store';
import * as fromRoot from 'src/app/@store';
import * as fromCases from 'src/app/cases/@store/cases';

import { CaseViewItemModel } from 'src/app/cases/models';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dialog-item-description',
  templateUrl: './dialog-item-description.component.html',
  styleUrls: ['./dialog-item-description.component.scss']
})
export class DialogItemDescriptionComponent implements OnInit, OnDestroy, AfterViewInit {
  public theme$: Observable<string>;

  public loaded$: Observable<boolean>;

  public shippingInfo: string;

  public item$: Observable<CaseViewItemModel>;

  private unsubscribe$: Subject<void> = new Subject();

  @ViewChild('wrapper', { static: false }) wrapper: ElementRef;

  static show(dialog: MatDialog): any {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'added-dialog-container';
    dialogConfig.height = 'auto';

    return dialog.open(DialogItemDescriptionComponent, dialogConfig);
  }
  constructor(
    private store: Store<fromRoot.State>,
    public dialogRef: MatDialogRef<DialogItemDescriptionComponent>,
    private renderer: Renderer2,
    private titleService: Title,
    @Inject(MAT_DIALOG_DATA) _
  ) {
    this.loaded$ = this.store.pipe(select(fromCases.selectLoaded));
    this.item$ = this.store.pipe(select(fromCases.selectItemDetails));

    this.titleService.setTitle('Open Mystery Boxes at Lootie | Unbox Authentic Products | Description');

    this.item$.pipe(takeUntil(this.unsubscribe$)).subscribe(item => {
      if (item && item.shippingInfo) {
        this.shippingInfo = this.generateOutputText(item.shippingInfo);
        window.analytics.track('Item Viewed', {
          ItemName: item.name,
          ItemID: item._id,
          ItemPrice: item.value,
        });
      }
    });
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.subscribeToThemeChange();
  }

  close() {
    this.dialogRef.close();
  }

  subscribeToThemeChange() {
    this.theme$ = this.store.pipe(select(fromRoot.selectTheme));

    this.theme$.pipe(takeUntil(this.unsubscribe$))
      .subscribe((theme: string) => {
        if (this.wrapper && this.wrapper.nativeElement) {
          if (this.wrapper.nativeElement.classList.contains('dialog-wrapper__dark')) {
            this.renderer.removeClass(this.wrapper.nativeElement, 'dialog-wrapper__dark');
          }
          if (this.wrapper.nativeElement.classList.contains('dialog-wrapper__light')) {
            this.renderer.removeClass(this.wrapper.nativeElement, 'dialog-wrapper__light');
          }
          if (theme === 'light') {
            this.renderer.addClass(this.wrapper.nativeElement, 'dialog-wrapper__light');
            return;
          }
          this.renderer.addClass(this.wrapper.nativeElement, 'dialog-wrapper__dark');
        }
      });
  }

  generateOutputText(data): string {
    const countries = Object.keys(data);
    const canDeliver = [];
    let canNotDeliver = [];
    let otputText = '';

    countries.map(country => {
      if (data[country].canDeliver) {
        canDeliver.push(`$${data[country].estimatedShippingPrice} for ${country}`);
      } else {
        canNotDeliver.push(`${country}`);
      }
    });

    if (canDeliver.length) {
      otputText += `Estimated delivery cost ${canDeliver.join(', ')}. `;
    }

    if (canNotDeliver.length) {
      if (canNotDeliver.length > 1) {
        canNotDeliver = canNotDeliver.join(', ').split('');
        canNotDeliver.splice(canNotDeliver.lastIndexOf(','), 1, ' and');
      }

      otputText += `Does not ship to ${canNotDeliver.join('')}.`;
    }

    return otputText;
  }

  ngOnDestroy() {
    this.store.dispatch(new fromCases.CloseDescriptionModal());
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
