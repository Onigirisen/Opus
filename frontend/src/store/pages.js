const { default: jwtFetch} = require("./jwt");

export const RECEIVE_PAGE = "pages/RECEIVE_PAGE";
export const RECEIVE_PAGES = "pages/RECEIVE_PAGES";
export const REMOVE_PAGE = "pages/REMOVE_PAGE";

export const receivePage = page => ({
    type: RECEIVE_PAGE,
    page
});

export const receivePages = pages => ({
    type: RECEIVE_PAGES,
    pages
});

export const removePage = pageId => ({
    type: REMOVE_PAGE,
    pageId
});

export const fetchPage = (bookId, chapterId, pageId)  => async dispatch => {
    const res = await jwtFetch(`/api/books/${bookId}/chapters/${chapterId}/pages/${pageId}`);
    const data = await res.json();
    dispatch(receivePage(data.page));
};

export const fetchPages = (bookId, chapterId) => async dispatch => {
    const res = await jwtFetch(`/api/books/${bookId}/chapters/${chapterId}/pages`);
    const data = await res.json();
    dispatch(receivePages(data.pages));
};

export const createPage = (bookId, chapterId, page) => async (dispatch) => {
    debugger
    const res = await jwtFetch(`/api/books/${bookId}/chapters/${chapterId}/pages`, {
      method: "POST",
      body: JSON.stringify(page),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    dispatch(receivePage(data));
};

export const deletePage = (bookId, chapterId, pageId) => async dispatch => {
    await jwtFetch(`/api/books/${bookId}/chapters/${chapterId}/pages/${pageId}`, {method: "DELETE"});
    dispatch(removePage(chapterId));
};

export const updatePage = (bookId, chapterId, pageId, page) => async dispatch => {
    const res = await jwtFetch(`/api/books/${bookId}/chapters/${chapterId}/pages/${pageId}`, {
      method: 'PATCH',
      body: JSON.stringify(page),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await res.json();
    dispatch(receivePage(data));
};

const pagesReducer = (state= {}, action) => {
    Object.freeze(state);
    const nextState = {...state};
    switch (action.type) {
        case RECEIVE_PAGES:
            return {...state, ...action.pages};
        case RECEIVE_PAGE:
            nextState[action.page.id] = action.page;
            return nextState;
        case REMOVE_PAGE:
            delete nextState[action.pageId];
            return nextState;
        default:
            return state;
    }
};

export default pagesReducer;