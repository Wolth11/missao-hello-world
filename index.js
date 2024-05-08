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
    res.status(201).send(lista.filter(Boolean))
})

app.get("/personagem/:id", function (req, res) {
    const id = req.params.id
    const item = lista[id - 1]
    res.status(201).send(item)
})

app.use(express.json())

app.post("/personagem", function (req, res) {
    const body = req.body

    const novoItem = body.nome

    if (!novoItem) {
        return res.status(400).send("Cadê o nome parsa?")
    }

    if (lista.includes(novoItem)) {
        return res.status(409).send("Você é a dory?")
    }

    lista.push(novoItem)

    res.status(201).send("item enviado com sucesso: " + novoItem)

})

app.put("/personagem/:id", function (req, res) {
    const id = req.params.id
    const body = req.body
    const novoItem = body.nome

    if (!novoItem) {
        return res.status(400).send("Cadê o nome parsa?")
    }

    if (lista.includes(novoItem)) {
        return res.status(409).send("Você é a dory?")
    }

    lista[id - 1] = novoItem
    res.send("item atualizado com sucesso: " + id + " - " + novoItem)
})

app.delete("/personagem/:id", function (req, res) {
    const id = req.params.id
    delete lista[id - 1]
    res.send("Item removido com sucesso: " + id)
})
app.listen(3000)
