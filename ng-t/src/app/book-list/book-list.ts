import { Component, OnInit } from '@angular/core';
import { BookCard } from './book-card/book-card';
import { Book } from '../models/book.model';
import { BookService } from '../services/book';
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-book-list',
  imports: [BookCard],
  templateUrl: './book-list.html',
  styleUrl: './book-list.css'
})
export class BookList implements OnInit {
  title: string = "Available books";
  wishlist: Book[] = [];
  books: Book[] = [];

  constructor(private bookService: BookService, private route: ActivatedRoute, private router: Router) {

  }

  // ngOnInit(): void {
  //   this.bookService.getBooks().subscribe({
  //     next: (data: Book[]) => {
  //       this.books = data;
  //     },
  //     error: (err) => {
  //       console.error('Error fetching books:', err);
  //     }
  //   });
  // }

    ngOnInit(): void {
    this.route.queryParamMap.subscribe( (params:any) => {
      const desc = params.get('description');
      this.loadBooks(desc);
    })
  }

  loadBooks(description: string | null) {
    this.bookService.getBooks(description).subscribe({
      next: (data: Book[]) => {
        this.books = data;
      },
      error: (err) => {
        console.error('Error fetching books:', err);
      }
    })
  }

  onBookBooked(book: Book): void {
    console.log('Parent heard about booking:', book.title);
    // Potentially do more here in the future
  }

  onWishlistAdded(book: Book) {
    console.log('~Wishlist event triggered for:', book.title);
    if (!this.wishlist.includes(book))
        this.wishlist.push(book);
  }
}