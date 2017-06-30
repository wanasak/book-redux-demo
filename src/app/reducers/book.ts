import { Book } from './../models/book';
import * as book from '../actions/book';
import * as collection from '../actions/collection';
import { createSelector } from 'reselect';

export interface State {
    ids: string[];
    entities: { [id: string]: Book }; // typescript dictionary
    selectedBookId: string | null;
}

const initialState: State = {
    ids: [],
    entities: {},
    selectedBookId: null
};

export function reducer(state = initialState, action: book.Actions | collection.Actions): State {
    switch (action.type) {
        case book.SEARCH_COMPLETED:
        case collection.LOAD_BOOK_SUCCESS: {
            const books = action.payload;
            const newBooks = books.filter(book => !state.ids[book.id]);

            const newBookIds = newBooks.map(book => book.id);
            const newBookEntities = newBooks.reduce((entities: { [id: string]: Book }, book: Book) => {
                return Object.assign(entities, { [book.id]: book });
            }, {});

            return {
                ids: [...state.ids, ...newBookIds],
                entities: Object.assign({}, state.entities, newBookEntities),
                selectedBookId: state.selectedBookId
            };
        }
        case book.LOAD: {
            const book = action.payload;

            if (state.ids.indexOf(book.id) > -1) {
                return state;
            }

            return {
                ids: [...state.ids, book.id],
                entities: Object.assign({}, state.entities, {
                    [book.id]: book
                }),
                selectedBookId: state.selectedBookId
            };
        }
        case book.SELECT: {
            return {
                ids: state.ids,
                entities: state.entities,
                selectedBookId: action.payload
            };
        }
        default:
            return state;
    }
}

export const getEntities = (state: State) => state.entities;

export const getIds = (state: State) => state.ids;

export const getSelectedId = (state: State) => state.selectedBookId;

export const getSelected = createSelector(getEntities, getSelectedId, (entities, selectedId) => {
    return entities[selectedId];
});

export const getAll = createSelector(getEntities, getIds, (entities, ids) => {
    return ids.map(id => entities[id]);
});
