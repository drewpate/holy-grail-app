const express = require("express")
const redis = require("redis")

const client = redis.createClient();

const app = express()

app.use(express.static("public"))

async function data() {
    const [header, left, article, right, footer] = await client.mGet(["header", "left", "article", "right", "footer"])
    return {
        header: Number(header),
        left: Number(left),
        article: Number(article),
        right: Number(right),
        footer: Number(footer)
    }
}

app.get("/data", async (req, res) => {
    res.json(await data())
})

app.get("/update/:key/:value", async(req, res) => {
    const key = req.params.key
    const val = Number(req.params.value)

    const currentVal = await client.GET(key)

    await client.SET(key, Number(currentVal) + val)

    res.json(await data())
})

app.listen(3000, async() => {
    client.connect()

    // Set initial values
    await client.mSet(["header", "0", "left", "0", "article", "0", "right", "0", "footer", "0"]);
    console.log("Listening on 3000")
})