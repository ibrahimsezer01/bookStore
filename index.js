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
require('./data/db')

app.get('/', (req, res) => {
    // throw new Error (" development server not available for express server ")
    res.send('Hello World!')
})


// routes
const router = require("./routers/router")
app.use(router)

// server configuration settings
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Example app listening on port ${port}!`))