import { Component } from '@angular/core';
import { MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'confirm-dialog',
  templateUrl: 'confirm-dialog.html',
})

export class ConfirmDialog {
  constructor(public dialogRef: MatDialogRef<ConfirmDialog>) {}

  close() {
    this.dialogRef.close({ status: "cancel" })
  }

  confirm() {
    this.dialogRef.close({ status: "confirm" })
  }

}
