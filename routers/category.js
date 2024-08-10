const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth');
const category = require('../controllers/category');

router.post("/", auth, category.post_category);

router.put("/:id", auth, category.put_category);

router.delete("/:id", auth, category.delete_category);

router.get("/", auth, category.get_categories);


module.exports = router