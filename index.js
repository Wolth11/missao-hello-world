const express = require("express");
const app = express();
const lista = ["JAVA", "KOTLIN", "ANDROID"]

app.get("/", function (req, res) {
    res.send("HELLO WORLD!");
});

app.get("/oi", function (req, res) {
    res.send("olá mundo")
})

app.get("/personagem", function (req, res) {
    res.send(lista)
})


app.listen(3000)
