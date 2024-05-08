const express = require("express");
const { MongoClient } = require("mongodb");
const app = express();
const lista = ["JAVA", "KOTLIN", "ANDROID"]
const dbUrl = "mongodb+srv://admin:MhEfvW3C.wcTanK@cluster0.lygekv7.mongodb.net"
const dbName = "mongodb-intro-e-imprementacao"

async function main() {

    const client = new MongoClient(dbUrl)
    console.log("Conectando ao banco de dados...")
    await client.connect()
    console.log("Banco de dados conectado com sucesso!")

    const db = client.db(dbName)
    const collection = db.collection("personagem")

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

        if (!item) {
            return res.status(404).send("Item não encontrado.")
        }

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

        if (!lista[id - 1]) {
            return res.status(404).send("Item não encontrado.")
        }

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

        if (!lista[id - 1]) {
            return res.status(404).send("Item não encontrado.")
        }


        delete lista[id - 1]


        res.send("Item removido com sucesso: " + id)
    })
    app.listen(3000)
}

main()
