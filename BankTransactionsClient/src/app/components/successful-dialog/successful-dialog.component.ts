import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-successful-dialog',
  standalone: true,
  imports: [MatDialogContent],
  templateUrl: './successful-dialog.component.html',
  styleUrl: './successful-dialog.component.css'
})
export class SuccessfulDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<SuccessfulDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
