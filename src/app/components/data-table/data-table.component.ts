import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../../models/book.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements AfterViewInit {
  @Output() select = new EventEmitter<Book>();
  @Output() delete = new EventEmitter<number>();

  displayedColumns: string[] = ['title', 'price', 'rating', 'stock', 'category', 'actions'];
  dataSource = new MatTableDataSource<Book>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @Input() set books(value: Book[]) {
    this.dataSource.data = value;
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  onSelectBook(book: Book) {
    this.select.emit(book);
  }

  onDelete(id: number) {
    this.delete.emit(id);
  }

  starsArray(count: number): number[] {
    return Array(count).fill(0);
  }
}
