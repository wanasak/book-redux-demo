import { Observable } from 'rxjs/Observable';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRoot from './reducers';
import * as layout from './actions/layout';

@Component({
  selector: 'app-root',
  template: `
    <app-layout>
      <app-sidenav [open]="showSidenav$ | async">
        <app-navitem (activate)="closeSidenav()" routerLink="/" icon="book" hint="View your book collection">
          My Collection
        </app-navitem>
        <app-navitem (activate)="closeSidenav()" routerLink="/book/find" icon="search" hint="Find your next book!">
          Browse Books
        </app-navitem>
      </app-sidenav>
      <app-toolbar (openMenu)="openSidenav()">
        Book Redux Demo App
      </app-toolbar>
      <router-outlet></router-outlet>
    </app-layout>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  showSidenav$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>) {
    /**
     * Selectors can be applied with the `select` operator which passed the state
     * tree to the provided selector
     */
    this.showSidenav$ = store.select(fromRoot.getShowSidenav);
  }

  closeSidenav() {
    /**
     * All state updates are handled through dispatched actions in `container`
     * components.
     */
    this.store.dispatch(new layout.CloseSidenavAction());
  }

  openSidenav() {
    this.store.dispatch(new layout.OpenSidenavAction());
  }

}
