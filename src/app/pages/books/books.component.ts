import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';
import { FilterBarComponent } from '../../components/filter-bar/filter-bar.component';
import { DataTableComponent } from '../../components/data-table/data-table.component';
import { BookCardComponent } from '../../components/book-card/book-card.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ChangeDetectorRef } from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {MatSnackBar} from "@angular/material/snack-bar";
import {ErrorDialogComponent} from "../../components/error-dialog/error-dialog.component";

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [
    CommonModule,
    FilterBarComponent,
    DataTableComponent,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatIcon,
  ],
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
  books: Book[] = [];
  filteredBooks: Book[] = [];
  categories: string[] = [];
  selectedBook: Book | null = null;
  loading = signal(false);

  constructor(private bookService: BookService, private dialog: MatDialog, private cdr: ChangeDetectorRef,
              private snackBar: MatSnackBar ) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.bookService.getBooks().subscribe((books) => {
      this.books = books;
      this.filteredBooks = books;
      this.categories = [...new Set(books.map(b => b.category))];
      this.cdr.detectChanges();
    });
  }

  onSelectBook(book: Book) {
    console.log('Seleccionó libro con id:', book.id);
    const dialogRef = this.dialog.open(BookCardComponent, { data: book });
    dialogRef.afterClosed().subscribe((bookIdToDelete) => {
      if (bookIdToDelete) {
        console.log('book deleted id:', book.id);
        this.deleteBook(bookIdToDelete);
      }
    });
  }

  onFilterChange(filters: { category: string, maxPrice: number | null, searchTerm: string }) {
    this.filteredBooks = this.books.filter(book => {
      const matchCategory = filters.category ? book.category === filters.category : true;
      const matchPrice = filters.maxPrice ? book.price <= filters.maxPrice : true;
      const matchTitle = filters.searchTerm ? book.title.toLowerCase().includes(filters.searchTerm) : true;

      return matchCategory && matchPrice && matchTitle;
    });
  }

  scrapeBooks(): void {
    this.loading.set(true);
    this.bookService.scrapeBooks().subscribe({
      next: () => {
        this.bookService.getBooks().subscribe((books) => {
          this.books = [...books];
          this.filteredBooks = [...books];
          this.loading.set(false);
        });
      },
      error: (err) => {
        this.loading.set(false);
        this.dialog.open(ErrorDialogComponent, {
          data: {
            title: 'Error en el servicio',
            message: 'El servicio de scraping no está funcionando. Por favor, inténtelo de nuevo más tarde.'
          },
          width: '400px'
        });
      }
    });
  }

  deleteBook(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: '¿Eliminar libro?',
        message: '¿Estás seguro de que deseas eliminar este libro?',
        confirmText: 'Sí, eliminar',
        cancelText: 'Cancelar'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.bookService.deleteBook(id).subscribe({
          next: () => {
            this.books = this.books.filter(b => b.id !== id);
            this.filteredBooks = this.filteredBooks.filter(b => b.id !== id);
            this.selectedBook = null;
            this.cdr.detectChanges();
          },
          error: (err) => {
            console.error('Error al eliminar:', err);
            this.dialog.open(ErrorDialogComponent, {
              data: {
                title: 'Error al eliminar',
                message: 'El servicio no está funcionando. Intenta de nuevo más tarde.'
              }
            });
          }
        });
      }
    });
  }
}

