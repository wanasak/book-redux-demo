import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';

import * as fromRoot from '../reducers';
import * as book from '../actions/book';

@Component({
    selector: 'app-view-book-page',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <app-selected-book-page></app-selected-book-page>
    `
})
export class ViewBookPageComponent implements OnDestroy {

    /* Subscription represents a disposable resource */
    actionSubscription: Subscription;

    constructor(private store: Store<fromRoot.State>, private route: ActivatedRoute) {
        this.actionSubscription = route.params
            .select<string>('id')
            .map(id => new book.SelectAction(id))
            .subscribe(store);
    }

    ngOnDestroy() {
        this.actionSubscription.unsubscribe();
    }
}
