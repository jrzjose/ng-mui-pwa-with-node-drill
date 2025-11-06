import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookService } from '../services/book';
import { Book } from '../models/book.model';
import { Member } from '../models/member.model';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {SelectionModel} from '@angular/cdk/collections';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-sign-up-form',
  imports: [CommonModule, ReactiveFormsModule, MatTableModule, MatCheckboxModule, MatGridListModule, MatInputModule, MatFormFieldModule],
  templateUrl: './sign-up-form.component.html',
  styleUrl: './sign-up-form.component.css'
})
export class SignUpFormComponent implements OnInit {
  displayedColumns: string[] = ['select', "title"];
  signUpForm!: FormGroup;
  submissionSuccess: boolean = false;
  submissionError: string = '';
  // books: Book[] = [];
  books = new MatTableDataSource<Book>([]);
  selection = new SelectionModel<Book>(true, []);

  constructor(private fb: FormBuilder, private bookService: BookService){}

  ngOnInit(): void {
      this.signUpForm = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]]
      });

      this.bookService.getBooks().subscribe({
        next: (data: Book[]) => {
          // this.books = data;
          this.books = new MatTableDataSource<Book>(data);
        },
        error: (err) => {
          console.error('Error fetching books:', err);
        }
      });
  }

  get name() {
    return this.signUpForm.get('name');
  }

  get email() {
    return this.signUpForm.get('email');
  }
  
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.books.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.books.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Book): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.books.filter = filterValue.trim().toLowerCase();
  }

  onSubmit(): void {
    if(this.signUpForm.invalid) {
      return;
    }    

    let selectedBookIds: number[] = [];

    this.selection.selected.forEach((book: Book) => {
      selectedBookIds.push(book.id);
    });


    const newMember: Member = {
      id: 0,
      name: this.signUpForm.value.name,
      email: this.signUpForm.value.email,
      enrolledBookIds: selectedBookIds
    };

    this.bookService.addMember(newMember).subscribe({
      next: (member: Member) => {
        console.log('Member successfully signed up:', member);
        this.submissionSuccess = true;
        this.signUpForm.reset();
        this.selection.clear();
      },
      error: (err) => {
        console.error('Error signing up member:', err);
        this.submissionError = 'There was an error submitting your sign-up. Please try again.';
      }
    })
  }

}