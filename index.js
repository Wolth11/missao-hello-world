const express = require("express");
const app = express();

app.get("/", function (req, res) {
    res.send("HELLO WORLD!");
});

app.get("/oi", function (req, res) {
    res.send("olá mundo")
})

app.listen(3000)
