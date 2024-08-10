// environment
require("dotenv").config()

// express setup
const express = require('express')
const app = express()

// middleware
app.use(express.json())

// db setup
require('./data/db')()

app.get('/', (req, res) => res.send('Hello World!'))

// routes
const user = require('./routers/user')
const book = require('./routers/book')
app.use("/api/user", user)
app.use("/api/book", book)

// server configuration settings
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Example app listening on port ${port}!`))