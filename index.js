const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
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

    app.get("/personagem", async function (req, res) {
        const itens = await collection.find().toArray()
        res.send(itens)
    })

    app.get("/personagem/:id", async function (req, res) {
        const id = req.params.id
        const item = await collection.findOne ({ _id: new ObjectId(id)})
        if (!item) {
            return res.status(404).send("Item não encontrado.")
        }

        res.status(201).send(item)
    })

    app.use(express.json())

    app.post("/personagem", async function (req, res) {
        const novoItem = req.body

        if (!novoItem || !novoItem.nome) {
            return res.status(409).send("Sem info correta sem resposta")
        }

        // if (lista.includes(novoItem)) {
        //     return res.status(409).send("Você é a dory?")
        // }

        await collection.insertOne(novoItem)
        res.status(201).send(novoItem)

    })

    app.put("/personagem/:id", async function (req, res) {
        const id = req.params.id

        // if (!lista[id - 1]) {
        //     return res.status(404).send("Item não encontrado.")
        
        const novoItem = req.body

        if (!novoItem || !novoItem.nome) {
            return res.status(400).send("Cadê o nome parsa?")
        }

        // if (lista.includes(novoItem)) {
        //     return res.status(409).send("Você é a dory?")
        // }

        await collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: novoItem }
        )
        res.send(novoItem)
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
