const express = require("express");
const fileUpload = require("express-fileupload")
const fs = require("fs");
const path = require("path");

const app = express();
const port = 9000;
const feFolder = `${__dirname}/../frontend`;
const frontendPath = path.join(`${__dirname}/../frontend`);

app.use(express.json());
app.use(fileUpload());
app.use("/images", express.static(`${__dirname}/../frontend/images`));
app.get("/", (req, res, next) => {
    res.sendFile(`${frontendPath}/index.html`)
});

app.get("/image-list", (req, res) => {
    res.sendFile(`${frontendPath}/data.json`)
})

app.use("/public", express.static(`${frontendPath}/public`))

const uploads = `${frontendPath}/images/`
app.post("/", (req, res) => {
    
    //upload img
    const picture = req.files.picture;
    const answer = {}
    if (picture){
        console.dir(picture)
        picture.mv(`${uploads}${picture.name}`)  
    } 
    answer.pictureName = picture.name 
    res.send(answer) 
})
app.listen(port, () => {
    console.log(`http://127.0.0.1:${port}`);
});
