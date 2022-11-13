import jwtFetch from "./jwt";

export const RECEIVE_PIC = "pics/RECEIVE_PIC";
export const RECEIVE_PICS = "pics/RECEIVE_PICS";
export const REMOVE_PIC = "pics/REMOVE_PIC";

export const receivePic = picData => ({
    type: RECEIVE_PIC,
    picData
});

export const uploadPic = picData => async dispatch => {
    const { pic, uploaderId} = picData
    const formData = new FormData();
    formData.append("uploaderId", uploaderId);
    formData.append("image-upload", pic);
    const res = await jwtFetch('/api/profilePicture/upload', {
        method: 'POST',
        body: formData
    })

    let data = await res.json();
    return data;
}

const picsReducer = (state= {}, action) => {
    Object.freeze(state);
    const nextState = {...state};
    switch (action.type) {
        case RECEIVE_PIC:
            nextState[action.picData.id] = action.imageURL;
            return nextState;
        case REMOVE_PIC:
            delete nextState[action.picData.id];
            return nextState;
        default:
            return state;
    }
};

export default picsReducer;