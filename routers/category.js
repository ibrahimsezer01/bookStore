const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth');
const isAdmin = require('../middlewares/isAdmin');
const category = require('../controllers/category');

router.post("/", auth, isAdmin, category.post_category);

router.put("/:id", auth, isAdmin, category.put_category);

router.delete("/:id", auth, isAdmin, category.delete_category);

router.get("/", auth, category.get_categories);


module.exports = router