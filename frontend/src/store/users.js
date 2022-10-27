const { default: jwtFetch } = require("./jwt");

export const RECEIVE_USER = "users/RECEIVE_USER";

export const receiveUser = user => ({
    type: RECEIVE_USER,
    user
});

export const uploadProfilePicture = picData => async dispatch => {
    const { pic, uploaderId } = picData;
    let form = new FormData();
    form.append("image-upload", pic);
    form.append("uploaderId", uploaderId);

    debugger
    const res = await jwtFetch("/api/profilePicture/setProfilePic", {
        method: "POST",
        body: form,
    });

    debugger
    const data = await res.json();
};
