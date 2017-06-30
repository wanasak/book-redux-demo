import * as book from '../actions/book';

export interface State {
    ids: string[];
    loading: boolean;
    query: string;
};

const initialState: State = {
    ids: [],
    loading: false,
    query: ''
};

export function reducer(state = initialState, action: book.Actions): State {
    switch (action.type) {
        case book.SEARCH: {
            const query = action.payload;

            if (query === '') {
                return {
                    ids: [],
                    loading: false,
                    query
                };
            }

            return Object.assign({}, state, {
                loading: true,
                query
            });
        }
        case book.SEARCH_COMPLETED: {
            const books = action.payload;

            return {
                ids: books.map(b => b.id),
                loading: false,
                query: state.query
            };
        }
        default:
            return state;
    }
};

export const getIds = (state: State) => state.ids;

export const getQuery = (state: State) => state.query;

export const getLoading = (state: State) => state.loading;
