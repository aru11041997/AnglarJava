import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel  } from '@angular/forms';
import { Router } from '@angular/router';

import { IBook } from './book';
import { BookService } from './book.service';

declare let alertify:any;

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.css']
})
export class AddbookComponent implements OnInit {

  book:IBook={
    id:null,
    title:null,
    gener:null
  };
  pageTitle:string='Add Book';

  constructor(private bookService:BookService,private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(addBookForm: NgForm){
    if(addBookForm.valid){
    this.bookService.addBook(this.book).subscribe((result) => {
      if(result.status===201){
        alertify.success('Book Added Successfully.');
      }
    },(error)=>{
      alertify.error('Unable To Add Book.');
    });

    this.router.navigate(['/home']);
  }
  }

}
