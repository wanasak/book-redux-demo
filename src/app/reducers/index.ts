import { createSelector } from 'reselect';
import { environment } from './../../environments/environment.prod';
import { compose } from '@ngrx/core';
import { ActionReducer, combineReducers } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';

import * as fromSearch from './search';
import * as fromlayout from './layout';
import * as fromBook from './book';
import * as fromCollection from './collection';

export interface State {
    search: fromSearch.State;
    layout: fromlayout.State;
    book: fromBook.State;
    collection: fromCollection.State;
};

/**
 * Because metareducers take a reducer function and return a new reducer,
 * we can use our compose helper to chain them together. Here we are
 * using combineReducers to make our top level reducer, and then
 * wrapping that in storeLogger. Remember that compose applies
 * the result from right to left.
 */
const reducers = {
    search: fromSearch.reducer,
    layout: fromlayout.reducer,
    book: fromBook.reducer,
    collection: fromCollection.reducer
};

const developmentReducer: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<State> = combineReducers(reducers);

export function reducer(state: any, action: any) {
    if (environment.production) {
        return productionReducer(state, action);
    } else {
        return developmentReducer(state, action);
    }
}

/* Book */
export const getBooksState = (state: State) => state.book;

/**
 * Every reducers module exports selector functions, however child reducers
 * have no knowledge of the overall state tree. To make them useable, we need to
 * make a new selectors that wrap them.
 *
 * The creatorSelector function from the reselect library creates
 * very efficent selectors that are memorized and only recompute when arguments change.
 * The created selectors can also be composed together to select different pieces of state.
 */

export const getBookEntities = createSelector(getBooksState, fromBook.getEntities);
export const getBookIds = createSelector(getBooksState, fromBook.getIds);
export const getSelectedBookId = createSelector(getBooksState, fromBook.getSelectedId);
export const getSelectedBook = createSelector(getBooksState, fromBook.getSelected);

/* Search */
export const getSearchState = (state: State) => state.search;

export const getSearchBookIds = createSelector(getSearchState, fromSearch.getIds);
export const getSearchQuery = createSelector(getSearchState, fromSearch.getQuery);
export const getSearchLoading = createSelector(getSearchState, fromSearch.getLoading);

/**
 * Some selector functions create joins across parts of state.
 * This selector composes the search result IDs to return an array pf books in the store.
 */
export const getSearchResults = createSelector(getBookEntities, getSearchBookIds, (books, searchIds) => {
    return searchIds.map(id => books[id]);
});

/* Collection */
export const getCollectionState = (state: State) => state.collection;

export const getCollectionLoaded = createSelector(getCollectionState, fromCollection.getLoaded);
export const getCollectionLoading = createSelector(getCollectionState, fromCollection.getLoading);
export const getCollectionBookIds = createSelector(getCollectionState, fromCollection.getIds);
export const getBookCollection = createSelector(getBookEntities, getCollectionBookIds, (entities, ids) => {
    return ids.map(id => entities[id]);
});
export const isSelectedBookInCollection = createSelector(getCollectionBookIds, getSelectedBookId, (ids, selected) => {
    return ids.indexOf(selected) > -1;
});

/* Layout */
export const getLayoutState = (state: State) => state.layout;

export const getShowSidenav = createSelector(getLayoutState, fromlayout.getShowSidenav);
