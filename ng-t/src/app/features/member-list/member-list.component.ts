import { Component, OnInit } from '@angular/core';
import { Member } from '../../models/member.model';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {SelectionModel} from '@angular/cdk/collections';
import {MatGridListModule} from '@angular/material/grid-list';


@Component({
  selector: 'app-member-list',
  imports: [MatTableModule, MatCheckboxModule, MatGridListModule],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css'
})
export class MemberListComponent implements OnInit {
  displayedColumns: string[] = ['select', "id", "name", "email", "enrolledBookIds"];
  
  // members: Member[] = [];
  members = new MatTableDataSource<Member>([]);
  selection = new SelectionModel<Member>(true, []);
  books: Book[] = [];
  errorMessage: string = '';
  loading: boolean = false;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.fetchMembers();
    this.fetchBooks();
  }

  fetchMembers(): void {
    this.loading = true;
    this.bookService.getMembers().subscribe({
      next: (data: Member[]) => {
        this.members = new MatTableDataSource<Member>(data);
        this.loading = false;
      },
      error: (err) => {
        console.log('Error fetching members:', err);
        this.errorMessage = 'Failed to load Members. Please try again later.';
        this.loading = false;
      }
    });
  }

  fetchBooks(): void {
    this.bookService.getBooks().subscribe({
      next: (data: Book[]) => {
        this.books = data;
      },
      error: (err) => {
        console.log('Error fetching books:', err);
      }
    });
  }

  getBookTitle(bookIds: number[]): string {
    let bookTitles: string[] = [];
    const books: Book[] = this.books.filter(x => bookIds.includes(x.id))
    
    books.forEach((book: Book) => {
      bookTitles.push(book.title);
    });

    return bookTitles.length >0 ? bookTitles.join(",") : '...';
  }

   /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.members.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.members.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Member): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  test(elmt:any) {
    console.log(elmt);
    this.getBookTitle(elmt);
  }
}
