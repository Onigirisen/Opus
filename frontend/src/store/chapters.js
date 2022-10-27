const { default: jwtFetch} = require("./jwt");

export const RECEIVE_CHAPTER = "books/RECEIVE_CHAPTER";
export const RECEIVE_CHAPTERS = "chapters/RECEIVE_CHAPTERS";
export const REMOVE_CHAPTER = "chapters/REMOVE_CHAPTER";

export const receiveChapter = chapter => ({
    type: RECEIVE_CHAPTER,
    chapter
});

export const receiveChapters = chapters => ({
    type: RECEIVE_CHAPTERS,
    chapters
});

export const removeChapter = chapterId => ({
    type: REMOVE_CHAPTER,
    chapterId
});



export const fetchChapter = (bookId, chapterId)  => async dispatch => {
    const res = await jwtFetch(`/api/books/${bookId}/chapters/${chapterId}`);
    const data = await res.json();
    dispatch(receiveChapter(data.chapter));
};

export const fetchChapters = (bookId) => async dispatch => {
    const res = await jwtFetch(`/api/books/${bookId}/chapters/`);
    const data = await res.json();
    dispatch(receiveChapters(data.chapters));
};

export const deleteChapter = (bookId, chapterId) => async dispatch => {
    await jwtFetch(`/api/books/${bookId}/chapters/${chapterId}`, {method: "DELETE"});
    dispatch(removeChapter(chapterId));
};

export const updateChapter = (bookId, chapterId) => async dispatch => {
    const res = await jwtFetch(`/api/books/${bookId}/chapters/${chapterId}`, {
      method: 'PATCH',
      body: JSON.stringify(chapterId),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await res.json();
    dispatch(receiveChapter(data));
};

const chaptersReducer = (state= {}, action) => {
    Object.freeze(state);
    const nextState = {...state};
    switch (action.type) {
        case RECEIVE_CHAPTERS:
            return {...state, ...action.chapters};
        case RECEIVE_CHAPTER:
            nextState[action.chapter.id] = action.chapter;
            return nextState;
        case REMOVE_BOOK:
            delete nextState[action.chapterId];
            return nextState;
        default:
            return state;
    }
};

export default chaptersReducer;