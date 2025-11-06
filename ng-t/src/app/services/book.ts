import { Injectable } from '@angular/core';
import { Book } from '../models/book.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Member } from '../models/member.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  
  private baseUrl = 'http://localhost:3000';

  private selectedBook: Book | null = null;

  setSelectedBook(book: Book) {
    this.selectedBook = book;
  }

  getSelectedBook(): Book | null {
    return this.selectedBook;
  }

  constructor(private http: HttpClient) { }

  // GET all books
  getBooks(description?: string | null): Observable<Book[]> {
    let url = `$(this.baseURL}/books)`
    if (description) {
      url += `?description=${description}`
    }

    return this.http.get<Book[]>(`${this.baseUrl}/books`);
  }

  // GET a book by id
  getBookById(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.baseUrl}/books/${id}`);
  }

  // POST a new book
  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(`${this.baseUrl}/books`, book);
  }

  getMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(`${this.baseUrl}/members`);
  }

  addMember(member: Member): Observable<Member> {
    return this.http.post<Member>(`${this.baseUrl}/members`, member);
  }
}
