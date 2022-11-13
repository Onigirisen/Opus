const { default: jwtFetch} = require("./jwt");

export const RECEIVE_REVIEW = "reviews/RECEIVE_REVIEW";
export const RECEIVE_REVIEWS = "reviews/RECEIVE_REVIEW";
export const REMOVE_REVIEW = "reviews/REMOVE_REVIEW";

export const receiveReview = review => ({
    type: RECEIVE_REVIEW,
    review
});

export const receiveReviews = reviews => ({
    type: RECEIVE_REVIEWS,
    reviews
});

export const removeReview = reviewId => ({
    type: REMOVE_REVIEW,
    reviewId
});

export const fetchReview = (bookId, reviewId)  => async dispatch => {
    const res = await jwtFetch(`/api/books/${bookId}/reviews/${reviewId}`);
    const data = await res.json();
    dispatch(receiveReview(data.review));
};

export const fetchReviews = (bookId) => async dispatch => {
    const res = await jwtFetch(`/api/books/${bookId}/reviews`);
    const data = await res.json();
    dispatch(receiveReviews(data.reviews));
};

export const createReview = (bookId, review) => async (dispatch) => {
    debugger
    const res = await jwtFetch(`/api/books/${bookId}/reviews`, {
      method: "POST",
      body: JSON.stringify(review),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    dispatch(receiveReview(data));
};

export const deleteReview = (bookId, reviewId) => async dispatch => {
    await jwtFetch(`/api/books/${bookId}/reviews/${reviewId}`, {method: "DELETE"});
    dispatch(removeReview(reviewId));
};

export const updateReview = (bookId, reviewId, review) => async dispatch => {
    const res = await jwtFetch(`/api/books/${bookId}/reviews/${reviewId}`, {
      method: 'PATCH',
      body: JSON.stringify(review),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await res.json();
    dispatch(receiveReview(data));
};

const reviewsReducer = (state= {}, action) => {
    Object.freeze(state);
    const nextState = {...state};
    switch (action.type) {
        case RECEIVE_REVIEWS:
            return {...state, ...action.reviews};
        case RECEIVE_REVIEW:
            nextState[action.review.id] = action.review;
            return nextState;
        case REMOVE_REVIEW:
            delete nextState[action.reviewId];
            return nextState;
        default:
            return state;
    }
};

export default reviewsReducer;