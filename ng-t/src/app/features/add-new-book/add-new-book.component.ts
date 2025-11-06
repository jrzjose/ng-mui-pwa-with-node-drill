import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { BookService } from '../../services/book';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-add-new-book',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-new-book.component.html',
  styleUrl: './add-new-book.component.css'
})
export class AddNewBookComponent implements OnInit {
  addBookForm!: FormGroup;
  submissionSuccess: boolean=false;
  submissionError: string='';

  constructor(private fb: FormBuilder, private bookService: BookService) {}

  ngOnInit(): void {
    this.addBookForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: [null, [Validators.required, Validators.min(0)]],
      date: ['', [Validators.required]],
      img: ['', [Validators.required]],
      onSale: [false]
    });
  }

  get title() {
    return this.addBookForm.get('title');
  }

  get description() {
    return this.addBookForm.get('description');
  }

  get price() {
    return this.addBookForm.get('price');
  }

  get date() {
    return this.addBookForm.get('date');
  }

  get img() {
    return this.addBookForm.get('img');
  }

  get onSale() {
    return this.addBookForm.get('onSale');
  }

  onSubmit(): void {
    if (this.addBookForm.invalid) {
      return;
    }

    const newBook: Book = {
      id:0,
      title: this.addBookForm.value.title,
      description: this.addBookForm.value.description,
      price: this.addBookForm.value.price,
      date: this.addBookForm.value.date,
      img: this.addBookForm.value.img,
      onSale: this.addBookForm.value.onSale,
      soldOut: false
    }

    this.bookService.addBook(newBook).subscribe({
      next: (book: Book) => {
        console.log('Book successfully added:', book);
        this.submissionSuccess = true;
        this.addBookForm.reset();
      },
      error: (err) => {
        console.log('Error adding book:', err);
        this.submissionError = 'There was an error adding the book. Please try again.';
      }
    })
  }

}
