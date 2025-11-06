import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from '../../models/book.model';
import { Router } from '@angular/router'

@Component({
  selector: 'app-book-card',
  imports: [DatePipe, CurrencyPipe],
  templateUrl: './book-card.html',
  styleUrl: './book-card.css'
})
export class BookCard {
  @Input() book?: Book;
  @Output() bookBooked = new EventEmitter<any>();
  @Output() wishlistAdded = new EventEmitter<any>();

  constructor(private router:Router) {}

  onBookBooked(): void {
    this.bookBooked.emit(this.book);
  }

  onAddToWishlist(): void {
    this.wishlistAdded.emit(this.book);
  }

  goToDetails(bookId: number): void {
    this.router.navigate(['/books', bookId]);
  }
}
