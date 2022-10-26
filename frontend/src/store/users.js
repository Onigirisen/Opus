const { default: jwtFetch } = require("./jwt");

export const RECEIVE_USERS = "users/RECEIVE_USERS";
export const RECEIVE_USER = "users/RECEIVE_USER";

export const receiveUsers = users => ({
    type: RECEIVE_USERS,
    users
});
  
export const receiveUser = user => ({
    type: RECEIVE_USER,
    user
});

try {
    const uploadProfilePicture = new FormData();
    formData.append("image-upload", convertedUrlToFile);

    const res = await jwtFetch("/api/profilePicture/setProfilePic", {
        method: "POST",
        body: formData,
    });

    const data = await res.json();
} catch (err) {
    console.warn(err);
}