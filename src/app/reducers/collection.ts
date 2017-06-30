import { REMOVE_BOOK_FAIL } from './../actions/collection';
import * as collection from '../actions/collection';

export interface State {
    loaded: boolean;
    loading: boolean;
    ids: string[];
};

const initialState: State = {
    loaded: false,
    loading: false,
    ids: []
};

export function reducer(state = initialState, action: collection.Actions): State {
    switch (action.type) {
        case collection.LOAD_BOOK: {
            return Object.assign({}, state, {
                loading: true
            });
        }
        case collection.LOAD_BOOK_SUCCESS: {
            const books = action.payload;

            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                ids: books.map(b => b.id)
            });
        }
        case collection.ADD_BOOK_SUCCESS:
        case collection.REMOVE_BOOK_FAIL: {
            const book = action.payload;

            if (state.ids.indexOf(book.id) > -1) {
                return state;
            }

            return Object.assign({}, state, {
                ids: [...state.ids, book.id]
            });
        }
        case collection.REMOVE_BOOK_SUCCESS:
        case collection.ADD_BOOK_FAIL: {
            const book = action.payload;

            return Object.assign({}, state, {
               ids: state.ids.filter(id => id !== book.id)
            });
        }
        default: return state;
    }
};

export const getLoaded = (state: State) => state.loaded;

export const getLoading = (state: State) => state.loading;

export const getIds = (state: State) => state.ids;
