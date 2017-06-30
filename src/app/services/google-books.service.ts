import { Book } from './../models/book';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

@Injectable()
export class GoogleBooksService {

  private API_PATH = 'https://www.googleapis.com/books/v1/volumes';

  constructor(private http: Http) { }

  searchBooks(queryTitle: string): Observable<Book[]> {
    return this.http.get(`${this.API_PATH}?q=${queryTitle}`)
      .map(res => res.json().items || []);
  }

  getBook(volumnId: string): Observable<Book> {
    return this.http.get(`${this.API_PATH}/${volumnId}`)
      .map(res => res.json());
  }

}
