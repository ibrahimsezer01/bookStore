const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth');
const user = require('../controllers/user');

router.post("/singup", user.singup)
router.post("/login", user.login)
router.put("/profile", auth, user.putUser)
router.get("/profile", auth, user.getUserProfile)


module.exports = router