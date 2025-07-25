import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.scss']
})
export class ErrorDialogComponent {
  constructor(
      @Inject(MAT_DIALOG_DATA) public data: { title: string; message: string },
      private dialogRef: MatDialogRef<ErrorDialogComponent>
  ) {}

  close() {
    this.dialogRef.close();
  }
}
