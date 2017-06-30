import { Store } from '@ngrx/store';
import { Book } from './../models/book';
import { Observable } from 'rxjs/Observable';
import { Component, ChangeDetectionStrategy } from '@angular/core';

import * as fromRoot from '../reducers';

@Component({
    selector: 'app-collection',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <md-card>
            <md-card-title>My Collection</md-card-title>
        </md-card>
        <app-book-preview-list [books]="books$ | async"></app-book-preview-list>
    `,
    styles: [`
        md-card-title {
        display: flex;
        justify-content: center;
        }
    `]
})
export class CollectionComponent {

    books$: Observable<Book[]>;

    constructor(private store: Store<fromRoot.State>) {
        this.books$ = store.select(fromRoot.getBookCollection);
    }

}
