import { Component, OnInit, Inject, OnDestroy, ViewChild, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { select, Store } from '@ngrx/store';
import * as fromRoot from 'src/app/@store';
import * as fromCases from 'src/app/cases/@store';
import { CasesService } from 'src/app/cases/services/cases.service';

import { CaseModel, CaseUnboxingModel } from 'src/app/cases/models';

@Component({
  selector: 'app-dialog-unbox',
  templateUrl: './dialog-unbox.component.html',
  styleUrls: ['./dialog-unbox.component.scss']
})
export class DialogUnboxComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('wrapper', { static: false }) wrapper: ElementRef;

  public theme$: Observable<string>;

  public unboxedItem$: Observable<CaseUnboxingModel>;

  public unboxingItem: CaseModel;

  public unboxingForm: FormGroup;

  private unsubscribe$: Subject<void> = new Subject();

  static show(dialog: MatDialog, item: CaseModel): any {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'added-dialog-container';
    dialogConfig.height = 'auto';
    dialogConfig.data = item;

    return dialog.open(DialogUnboxComponent, dialogConfig);
  }
  constructor(
    public dialogRef: MatDialogRef<DialogUnboxComponent>,
    public fb: FormBuilder,
    private store: Store<fromRoot.State>,
    private renderer: Renderer2,
    private casesService: CasesService,
    @Inject(MAT_DIALOG_DATA) data: CaseModel
  ) {
    this.unboxedItem$ = this.store.pipe(select(fromCases.selectUnboxingCase));

    this.unboxingItem = data;
    this.unboxingForm = this.fb.group({
      caseId: [this.unboxingItem._id, Validators.required],
      seed: [this.casesService.generateSeed(), [
        Validators.required,
        Validators.minLength(16),
        Validators.maxLength(16),
      ]],
      count: [1, [
        Validators.required,
        Validators.min(1),
        Validators.max(10),
      ]],
    });
  }

  public ngOnInit() {
  }

  ngAfterViewInit() {
    this.subscribeToThemeChange();
  }

  public unbox() {
    if (this.unboxingForm.invalid) {
      return;
    }

    this.disableForm();
    this.store.dispatch(new fromCases.UnboxCase(this.unboxingForm.value));
  }

  public onGenerateSeed() {
    this.unboxingForm.patchValue({
      seed: this.casesService.generateSeed(),
    });
  }

  public disableForm() {
    this.unboxingForm.disable();
  }

  public close() {
    this.dialogRef.close();
  }

  public subscribeToThemeChange() {
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

  public ngOnDestroy() {
    this.store.dispatch(new fromCases.ResetUnboxingCase());
    this.store.dispatch(new fromCases.CloseUnboxModal());
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
