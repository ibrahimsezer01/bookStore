const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth');
const comment = require('../controllers/comment');

// Yorum ekleme
router.post('/:id', auth, comment.post_comment);

// Kitaba ait yorumları alma
router.get('/:id', auth, comment.get_comments);

// Yorum silme
router.delete('/:bookId/:commentId', auth, comment.delete_comment);

// Yorum güncelleme
router.put('/:bookId/:commentId', auth, comment.update_comment);

// Tek bir yorumu alma
router.get('/:bookId/:commentId', auth, comment.get_comment);

// Kullanıcıya ait yorumları alma
router.get('/user', auth, comment.get_comments_by_user);

// Kitaba ait yorumları alma
router.get('/book/:bookId',auth,  comment.get_comments_by_book);


module.exports = router