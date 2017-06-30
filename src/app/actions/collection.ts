import { Book } from './../models/book';
import { Action } from '@ngrx/store';

export const ADD_BOOK = '[COLLECTION] ADD_BOOK';
export const ADD_BOOK_SUCCESS = '[COLLECTION] ADD_BOOK_SUCCESS';
export const ADD_BOOK_FAIL = '[COLLECTION] ADD_BOOK_FAIL';
export const REMOVE_BOOK = '[COLLECTION] REMOVE_BOOK';
export const REMOVE_BOOK_SUCCESS = '[COLLECTION] REMOVE_BOOK_SUCCESS';
export const REMOVE_BOOK_FAIL = '[COLLECTION] REMOVE_BOOK_FAIL';
export const LOAD_BOOK = '[COLLECTION] LOAD_BOOK';
export const LOAD_BOOK_SUCCESS = '[COLLECTION] LOAD_BOOK_SUCCESS';
export const LOAD_BOOK_FAIL = '[COLLECTION] LOAD_BOOK_FAIL';

export class AddBookAction implements Action {
    readonly type = ADD_BOOK;

    constructor(public payload: Book) { }
}

export class AddBookSuccessAction implements Action {
    readonly type = ADD_BOOK_SUCCESS;

    constructor(public payload: Book) { }
}

export class AddBookFailAction implements Action {
    readonly type = ADD_BOOK_FAIL;

    constructor(public payload: Book) { }
}

export class RemoveBookAction implements Action {
    readonly type = REMOVE_BOOK;

    constructor(public payload: Book) { }
}

export class RemoveBookSuccessAction implements Action {
    readonly type = REMOVE_BOOK_SUCCESS;

    constructor(public payload: Book) { }
}

export class RemoveBookFailAction implements Action {
    readonly type = REMOVE_BOOK_FAIL;

    constructor(public payload: Book) { }
}

export class LoadBookAction implements Action {
    readonly type = LOAD_BOOK;
}

export class LoadBookSuccessAction implements Action {
    readonly type = LOAD_BOOK_SUCCESS;

    constructor(public payload: Book[]) { }
}

export class LoadBookFailAction implements Action {
    readonly type = LOAD_BOOK_FAIL;

    constructor(public payload: any) { }
}

export type Actions = AddBookAction
    | AddBookSuccessAction
    | AddBookFailAction
    | RemoveBookAction
    | RemoveBookSuccessAction
    | RemoveBookFailAction
    | LoadBookAction
    | LoadBookSuccessAction
    | LoadBookFailAction;
