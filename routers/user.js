const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth');
const upload = require('../middlewares/multer');
const user = require('../controllers/user');

router.post("/singup", upload.single("avatar"), user.singup)
router.post("/login", user.login)
router.put("/profile", auth, upload.single("avatar"), user.putUser)
router.get("/profile", auth, user.getUserProfile)


module.exports = router