const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth');
const book = require('../controllers/book');

router.post("/", auth, book.post_book);
router.put("/:id", auth, book.put_book);
router.delete("/:id", auth, book.delete_book);
router.get("/:id", auth, book.get_book);
router.get("/", auth, book.get_books);

module.exports = router