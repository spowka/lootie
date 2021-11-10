import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-deposit-dialog',
  templateUrl: './deposit-dialog.component.html',
  styleUrls: ['./deposit-dialog.component.scss']
})
export class DepositDialogComponent implements OnInit {
  public checkoutUrl: string;

  static hide(dialog: MatDialog): any {
    return dialog.closeAll();
  }

  static show(dialog: MatDialog, url: string): any {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'deposit-dialog-container';
    dialogConfig.height = 'auto';
    dialogConfig.data = url;

    return dialog.open(DepositDialogComponent, dialogConfig);
  }

  constructor(
    public dialogRef: MatDialogRef<DepositDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data,
  ) {
    this.checkoutUrl = data;
  }

  ngOnInit() {
  }

}
