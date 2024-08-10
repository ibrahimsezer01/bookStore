// environment
require("dotenv").config()

// express-async-errors
require("express-async-errors")

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
const category = require('./routers/category')
const comment = require('./routers/comment')
app.use("/api/user", user)
app.use("/api/book", book)
app.use("/api/category", category)
app.use("/api/comment", comment)

// server configuration settings
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Example app listening on port ${port}!`))