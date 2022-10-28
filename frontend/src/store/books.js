const { default: jwtFetch} = require("./jwt");

export const RECEIVE_BOOK = "books/RECEIVE_BOOK";
export const RECEIVE_BOOKS = "books/RECEIVE_BOOKS";
export const REMOVE_BOOK = "books/REMOVE_BOOK";

export const receiveBook = book => ({
    type: RECEIVE_BOOK,
    book
});

export const receiveBooks = books => ({
    type: RECEIVE_BOOKS,
    books
});

export const removeBook = bookId => ({
    type: REMOVE_BOOK,
    bookId
});


export const fetchBook = bookId => async dispatch => {
    const res = await jwtFetch(`/api/books/${bookId}`);
    const data = await res.json();
    dispatch(receiveBook(data.book));
};

export const fetchBooks = () => async dispatch => {
    const res = await jwtFetch(`/api/books`);
    const data = await res.json();
    dispatch(receiveBooks(data));
};

export const deleteBook = bookId => async dispatch => {
    await jwtFetch(`/api/books/${bookId}`, {method: "DELETE"});
    dispatch(removeBook(bookId));
};

export const createBook = (book) => async (dispatch) => {
    const res = await jwtFetch("/api/books", {
      method: "POST",
      body: JSON.stringify(book),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    dispatch(receiveBook(data));
  };

export const updateBook = book => async dispatch => {
    const res = await jwtFetch(`/api/books/${book.id}`, {
      method: 'PATCH',
      body: JSON.stringify(book),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await res.json();
    dispatch(receiveBook(data));
};

const booksReducer = (state= {}, action) => {
    Object.freeze(state);
    const nextState = {...state};
    switch (action.type) {
        case RECEIVE_BOOKS:
            return {...state, ...action.books};
        case RECEIVE_BOOK:
            nextState[action.book.id] = action.book;
            return nextState;
        case REMOVE_BOOK:
            delete nextState[action.bookId];
            return nextState;
        default:
            return state;
    }
};

export default booksReducer;