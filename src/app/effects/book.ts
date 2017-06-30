import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { toPayload, Effect, Actions } from '@ngrx/effects';
import { GoogleBooksService } from './../services/google-books.service';
import { Injectable } from '@angular/core';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/takeUntil';

import * as book from '../actions/book';

/**
 * Effects offer a way to isolate and easily test side-effects within your
 * application.
 * The `toPayload` helper function returns just
 * the payload of the currently dispatched action, useful in
 * instances where the current state is not necessary.
 *
 * Documentation on `toPayload` can be found here:
 * https://github.com/ngrx/effects/blob/master/docs/api.md#topayload
 *
 * If you are unfamiliar with the operators being used in these examples, please
 * check out the sources below:
 *
 * Official Docs: http://reactivex.io/rxjs/manual/overview.html#categories-of-operators
 * RxJS 5 Operators By Example: https://gist.github.com/btroncone/d6cf141d6f2c00dc6b35
 */

@Injectable()
export class BookEffects {

  @Effect()
  search$: Observable<Action> = this.actions$
    .ofType(book.SEARCH)
    .debounceTime(300)
    .map(toPayload)
    .switchMap(query => {
      if (query === '') {
        return empty();
      }

      const nextSearch$ = this.actions$.ofType(book.SEARCH).skip(1);

      return this.service.searchBooks(query)
        .takeUntil(nextSearch$)
        .map(books => new book.SearchCompletedAction(books))
        .catch(() => of(new book.SearchCompletedAction([])));
    });

  constructor(
    private service: GoogleBooksService,
    private actions$: Actions
  ) { }

}
