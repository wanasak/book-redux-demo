import { Book } from './../models/book';
import { of } from 'rxjs/observable/of';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Database } from '@ngrx/db';
import { defer } from 'rxjs/observable/defer';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toArray';
import 'rxjs/add/operator/mergeMap';

import * as collection from '../actions/collection';

@Injectable()
export class BooksEffects {

    /**
     * This effect does not yield any actions back to the store.
     * Set `dispatch` to false to hint to @ngrx/effects that it should 
     * ignore
     *
     * The `defer` observable accepts an observable factory function
     * that is called when the observable is subscribed to
     */
    @Effect({ dispatch: false })
    openDB$: Observable<any> = defer(() => {
        return this.db.open('books_app');
    });

    /**
     * This effect make use of the `startWith` operator to trigger
     * the effect immediately on startup
     */
    @Effect()
    loadBooks$: Observable<Action> = this.actions$
        .ofType(collection.LOAD_BOOK)
        .startWith(new collection.LoadBookAction())
        .switchMap(() =>
            this.db.query('books')
                .toArray()
                .map((res: Book[]) => new collection.LoadBookSuccessAction(res))
                .catch(error => of(new collection.LoadBookFailAction(error)))
        );

    @Effect()
    addBook$: Observable<Action> = this.actions$
        .ofType(collection.ADD_BOOK)
        .map((action: collection.AddBookAction) => action.payload)
        .mergeMap(book =>
            this.db.insert('books', [book])
                .map(() => new collection.AddBookSuccessAction(book))
                .catch(() => of(new collection.AddBookFailAction(book)))
        );

    @Effect()
    removeBook$: Observable<Action> = this.actions$
        .ofType(collection.REMOVE_BOOK)
        .map((action: collection.RemoveBookAction) => action.payload)
        .mergeMap(book =>
            this.db.executeWrite('books', 'delete', [book.id])
                .map(() => new collection.RemoveBookSuccessAction(book))
                .catch(() => of(new collection.RemoveBookFailAction(book)))
        );

    constructor(private actions$: Actions, private db: Database) { }

}
