// environment
require("dotenv").config()

// express-async-errors
require("express-async-errors")

// express setup
const express = require('express')
const app = express()

// custom middleware
const rateLimiter = require("./middlewares/rateLimiter")

// middleware
app.use(express.json())
app.use(rateLimiter)

// db setup
require('./data/db')()

app.get('/', (req, res) => res.send('Hello World!'))

// routes
const user = require('./routers/user')
const book = require('./routers/book')
const category = require('./routers/category')
const comment = require('./routers/comment')
const error = require('./middlewares/error')
app.use("/api/user", user)
app.use("/api/book", book)
app.use("/api/category", category)
app.use("/api/comment", comment)
app.use(error)

// server configuration settings
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Example app listening on port ${port}!`))