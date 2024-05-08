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

app.use(express.json())

app.post("/personagem", function (req, res) {
    const body = req.body

    const novoItem = body.nome

    lista.push(novoItem)

    res.send("item enviado com sucesso: " + novoItem)

})

app.put("/personagem/:id", function (req, res) {
    const id = req.params.id
    const body = req.body
    const novoItem = body.nome
    lista[id - 1] = novoItem
    res.send("item atualizado com sucesso: " + id + " - " + novoItem)
})
app.listen(3000)
