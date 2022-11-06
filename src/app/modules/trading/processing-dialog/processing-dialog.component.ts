import { Component } from '@angular/core';
import { MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'processing-dialog',
  templateUrl: 'processing-dialog.html',
  styleUrls: ['./processing-dialog.component.scss']
})

export class ProcessingDialog {
  constructor(public dialogRef: MatDialogRef<ProcessingDialog>) {}

  close() {
    this.dialogRef.close({ status: "cancel" })
  }

  confirm() {
    this.dialogRef.close({ status: "confirm" })
  }

}
