import { Component, OnInit, Inject, OnDestroy, ViewChild, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { select, Store } from '@ngrx/store';
import * as fromRoot from 'src/app/@store';
import * as fromProvablyFair from 'src/app/@store/provably-fair';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dialog-lookup',
  templateUrl: './dialog-lookup.component.html',
  styleUrls: ['./dialog-lookup.component.scss']
})
export class DialogLookupComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('wrapper', { static: false }) wrapper: ElementRef;

  public unboxing$: Observable<any>;

  public clientSeedControl: FormControl;
  public serverSeedControl: FormControl;
  public serverSeedHashedControl: FormControl;

  public isCopied: boolean;

  public theme$: Observable<string>;

  private unsubscribe$: Subject<void> = new Subject();

  static show(dialog: MatDialog): any {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'added-dialog-container';
    dialogConfig.height = 'auto';

    return dialog.open(DialogLookupComponent, dialogConfig);
  }
  constructor(
    private store: Store<fromRoot.State>,
    public dialogRef: MatDialogRef<DialogLookupComponent>,
    private renderer: Renderer2,
    private toast: ToastrService,
    private titleService: Title,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.unboxing$ = this.store.pipe(select(fromProvablyFair.selectProvablyFair));

    this.clientSeedControl = new FormControl({value: '', disabled: true});
    this.serverSeedControl = new FormControl({value: '', disabled: true});
    this.serverSeedHashedControl = new FormControl({value: '', disabled: true});

    this.titleService.setTitle('Unboxing not found');

    this.unboxing$.pipe(takeUntil(this.unsubscribe$)).subscribe(unboxing => {
      if (!unboxing) {
        return;
      }

      this.clientSeedControl.setValue(unboxing.clientSeed);
      this.serverSeedControl.setValue(unboxing.seed);
      this.serverSeedHashedControl.setValue(unboxing.seedHash);
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

  onCopySuccess() {
    this.toast.success('Seed copied to clipboard');
  }

  onCopyFailure() {
    this.toast.error('Copy failed');
  }

  subscribeToThemeChange() {
    this.theme$ = this.store.pipe(select(fromRoot.selectTheme));

    this.theme$.pipe(takeUntil(this.unsubscribe$))
      .subscribe((theme: string) => {
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
      });
  }

  ngOnDestroy() {
    this.store.dispatch(new fromProvablyFair.CloseLookupModal());
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
