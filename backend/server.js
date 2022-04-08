const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 9000;
const feFolder = `${__dirname}/../frontend`;
const frontendPath = path.join(`${__dirname}/../frontend`);

app.use(express.json());

app.get("/", (req, res, next) => {
    res.sendFile(`${frontendPath}/index.html`)
});

app.get("/image-list", (req, res) => {
    res.sendFile(`${frontendPath}/data.json`)
})

app.use("/public", express.static(`${frontendPath}/public`))

app.listen(port, () => {
    console.log(`http://127.0.0.1:${port}`);
});
