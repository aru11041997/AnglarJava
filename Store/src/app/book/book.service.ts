import { Injectable } from "@angular/core";
import { IBook } from './book';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap,catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn:'root'
})
export class BookService{

    private booksURL:string='http://localhost:8090/book';

    constructor(private http:HttpClient){}

    getAllBooks(): Observable<IBook[]> {
        return this.http.get<IBook[]>(this.booksURL)
          .pipe(
            catchError(this.handleError)
          );
    }

    addBook(book: IBook): Observable<any> {
        return this.http.post<any>(this.booksURL + '/addBook', book,{observe:'response'})
                .pipe(
                        catchError(this.handleError)
                    );
      }

    deleteBook(bookId:number): Observable<any> {
        return this.http.delete(this.booksURL+'/'+bookId,{observe:'response'}).pipe(
            catchError(this.handleError)
          );
    }

    updateBook(book:IBook):Observable<any>{
        return this.http.put(this.booksURL+'/'+book.id,book).pipe(
            catchError(this.handleError)
        );
    }

    private handleError(err:HttpErrorResponse){
        let errorMessage='';
        if(err.error instanceof ErrorEvent){
            errorMessage=`An error occurred : $(err.error.message)`;
        }else{
            errorMessage=`Server returned code : $(err.status), error message is : $(err.message)`;
        }
        console.log(errorMessage);
        return throwError(errorMessage);
    }

}