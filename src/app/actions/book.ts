import { Book } from './../models/book';
import { Action } from '@ngrx/store';

export const SEARCH = '[BOOK] SEARCH';
export const SEARCH_COMPLETED = '[BOOK] SEARCH_COMPLETED';
export const LOAD = '[BOOK] LOAD';
export const SELECT = '[BOOK] SELECT';

/**
 * Every action is comprised of at least type and optional payload
 */

export class SearchAction implements Action {
    readonly type = SEARCH;

    constructor(public payload: string) { }
}

export class SearchCompletedAction implements Action {
    readonly type = SEARCH_COMPLETED;

    constructor(public payload: Book[]) { }
}

export class LoadAction implements Action {
    readonly type = LOAD;

    constructor(public payload: Book) { }
}

export class SelectAction implements Action {
    readonly type = SELECT;

    constructor(public payload: string) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions = SearchAction
    | SearchCompletedAction
    | LoadAction
    | SelectAction;
