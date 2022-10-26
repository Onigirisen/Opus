const { default: jwtFetch } = require("./jwt");


const form = new FormData();
formData.append("image-upload", convertedUrlToFile);

const res = await jwtFetch("", {
    method: "POST",
    body: formData,
});

 

