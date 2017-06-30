import { Store } from '@ngrx/store';
import { Book } from './../models/book';
import { Observable } from 'rxjs/Observable';
import { Component, ChangeDetectionStrategy } from '@angular/core';

import * as fromRoot from '../reducers';
import * as collection from '../actions/collection';

@Component({
    selector: 'app-selected-book-page',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <app-book-detail
            [book]="book$ | async"
            [inCollection]="isSelectedBookInCollection$ | async"
            (add)="addBookToCollection($event)"
            (remove)="removeBookFromCollection($event)">
        </app-book-detail>
    `
})
export class SelectedBookComponent {

    book$: Observable<Book>;
    isSelectedBookInCollection$: Observable<boolean>;

    constructor(private store: Store<fromRoot.State>) {
        this.book$ = store.select(fromRoot.getSelectedBook);
        this.isSelectedBookInCollection$ = store.select(fromRoot.isSelectedBookInCollection);
    }

    addBookToCollection(book: Book) {
        this.store.dispatch(new collection.AddBookAction(book));
    }

    removeBookFromCollection(book: Book) {
        this.store.dispatch(new collection.RemoveBookAction(book));
    }

}
