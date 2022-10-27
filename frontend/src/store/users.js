//import { receiveCurrentUser } from "./session";

const { default: jwtFetch } = require("./jwt");

export const RECEIVE_USER = "users/RECEIVE_USER";
export const RECEIVE_USERS = "users/RECEIVE_USERS";

export const receiveUser = user => ({
    type: RECEIVE_USER,
    user
});

export const receiveUsers = users => ({
    type: RECEIVE_USERS,
    users
});

export const getUser = userId => ({users}) => users ? users[userId] : null;
export const getUsers = ({users}) => users ? Object.values(users) : [];

export const fetchUser = userId => async dispatch => {
    const res = await jwtFetch(`/api/users/${userId}`);
    const data = await res.json();
    dispatch(receiveUser(data));
}

export const fetchUsers = () => async dispatch => {
    const res = await jwtFetch(`/api/users`);
    const data = await res.json();
    dispatch(receiveUsers(data));
}

export const updateBio = (user_id, bio) => async dispatch => {
    const res = await jwtFetch(`api/users/${user_id}`, {
        method: "PATCH",
        body: JSON.stringify({bio})
    });
    //const clone = res.clone();
    const user = await res.json();
    dispatch(receiveUser(user));
}

const usersReducer = (state = {}, action) => {
    Object.freeze(state);
    const nextState = {...state};
    switch(action.type) {
        case RECEIVE_USER: 
            nextState[action.user.id] = action.user;
            return nextState;
        default: 
            return state;
    }
}

export default usersReducer;