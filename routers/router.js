const express = require('express')
const router = express.Router()

const user = require('./user')
const book = require('./book')
const category = require('./category')
const comment = require('./comment')
const error = require('../middlewares/error')

router.use("/api/user", user)
router.use("/api/book", book)
router.use("/api/category", category)
router.use("/api/comment", comment)
router.use(error)

module.exports = router