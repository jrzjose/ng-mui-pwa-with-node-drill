import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book';

@Component({
  selector: 'app-book-detail',
  imports: [CommonModule],
  templateUrl: './book-detail.html',
  styleUrl: './book-detail.css'
})
export class BookDetail implements OnInit {
  book: Book | null = null;

  constructor(private bookService: BookService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idStr = params.get('id');
      if (idStr) {
        const id = +idStr;
        this.loadBookById(id);
      }
    })
  }

  loadBookById(id: number): void {
    this.bookService.getBookById(id).subscribe({
      next: (data: Book) => {
        this.book = data;
      },
      error: (err) => {
        console.error('Error fetching book by ID:', err);
      }
    })
  }
}
