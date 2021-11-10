import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material';

@Component({
  selector: 'app-chat-rules',
  templateUrl: './chat-rules.component.html',
  styleUrls: ['./chat-rules.component.scss']
})
export class ChatRulesComponent implements OnInit {

  static show(dialog: MatDialog): any {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'rules-dialog-container';

    return dialog.open(ChatRulesComponent, dialogConfig);
  }

  constructor(
    public dialogRef: MatDialogRef<ChatRulesComponent>,
    @Inject(MAT_DIALOG_DATA) data) { }

  ngOnInit() {
  }

}
