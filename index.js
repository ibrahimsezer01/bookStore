// environment
require("dotenv").config()

// express setup
const express = require('express')
const app = express()

// db setup
require('./data/db')()

app.get('/', (req, res) => res.send('Hello World!'))


// server configuration settings
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Example app listening on port ${port}!`))