import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IBook } from './book';
import { BookService } from './book.service';

declare let alertify:any;

@Component({
    selector:'app-book-list',
    templateUrl:'./book.component.html',
    styleUrls:['./book.component.css']
})
export class BookComponent implements OnInit{

    title : string = 'Book List';
    bookList:IBook[];
    errorMessage:string;
    editRecord:boolean=false;
    editRowId:number=null;
    originalBookList:IBook[];
    currentRecord:number=0;

    constructor(private bookService:BookService,private router :Router){}

    ngOnInit(): void {
        this.getAllBooks();
    }

    getAllBooks():void{
        this.bookService.getAllBooks().subscribe((resp: IBook[]) => {
            this.originalBookList=resp;
            this.bookList=resp;
          });
    }

    deleteBook(id:number):void{
        this.bookService.deleteBook(id).subscribe(()=>{
            result => console.log(result);
            window.location.reload();
        });
        // alertify.confirm('Confirmation','Are you sure you wanted to delete this record',
        //     function(){
        //         alertify.error('Sorry');
        //         this.bookService.deleteBook(id).subscribe(()=>{
        //             result => console.log(result);
        //             window.location.reload();
        //         });
        //     },
        //     function(){
        //         alertify.error('Sorry');
        //     }
        // );
    }

    editBook(id:number):void{
        this.editRowId=id;
        this.editRecord=true;
        this.currentRecord=id;
    }

    cancelEdit():void{
        this.editRowId=null;
        this.editRecord=false;
        this.currentRecord=0;
        this.getAllBooks();
    }

    saveRecord(book:IBook):void{
        this.bookService.updateBook(book).subscribe(()=>{
            result => console.log(result);
            window.location.reload();
        });
    }
}