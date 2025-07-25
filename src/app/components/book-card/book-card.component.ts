import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Book } from '../../models/book.model';
import {MatIcon} from '@angular/material/icon';
import {MatButton, MatIconButton} from '@angular/material/button';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-book-card',
  standalone: true,
  templateUrl: './book-card.component.html',
  imports: [
    MatIcon,
    MatIconButton,
    MatButton,
    NgForOf
  ],
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public book: Book,
    private dialogRef: MatDialogRef<BookCardComponent>
  ) {}

  close(): void {
    this.dialogRef.close();
  }

  onDeleteBook(id: number) {
    this.dialogRef.close(id);
  }

  starsArray(count: number): number[] {
    return Array(count).fill(0);
  }

}
