import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError, Observable, tap, throwError} from 'rxjs';
import {Book} from '../models/book.model';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private baseUrl = 'http://localhost:3002/books';

  constructor(private http: HttpClient) {}

  getBooks(params: any = {}): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseUrl}`, { params });
  }

  getBook(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.baseUrl}/${id}`);
  }

  scrapeBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseUrl}/scrape-books`).pipe(
        catchError(err => {
          console.error('Error al ejecutar el scraping:', err);
          return throwError(() => new Error('El servicio de scraping no está funcionando, por favor intente de nuevo.'));
        })
    );
  }

  deleteBook(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      tap(() => console.log(`Libro con id ${id} eliminado`)),
      catchError(err => {
        console.error('Error al eliminar el libro:', err);
        return throwError(() => err);
      })
    );
  }

}
