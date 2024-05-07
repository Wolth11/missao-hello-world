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

app.get("/personagem/:id", function (req, res) {
    const id = req.params.id
    const item = lista[id - 1]
    res.send(item)
})

app.listen(3000)
