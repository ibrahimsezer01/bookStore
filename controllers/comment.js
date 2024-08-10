const { Comment, validateComment } = require('../models/comment');
const { Book } = require('../models/book');

exports.post_comment = async (req, res) => {
    const user = req.user._id;
    const text = req.body.text;
    const bookId = req.params.id

    const book = await Book.findById(bookId);
    if (!book) return res.status(404).send('Kitap bulunamadi.');
    
    const { error } = validateComment({ user, bookId, text });
    if (error) return res.status(400).send(error.details[0].message);
    
    let comment = new Comment({
        user: user,
        book: bookId,
        text: text,
    })

    comment = await comment.save();

    book.comments.push(comment._id);
    await book.save();
    
    res.send(comment);
}

exports.get_comments = async (req, res) => {
    const book = await Book.findById(req.params.id).populate('comments.user', 'username');
    if (!book) return res.status(404).send('Kitap bulunamadi.');
    
    res.send(book.comments);
}

exports.delete_comment = async (req, res) => {
    const book = await Book.findById(req.params.bookId);
    if (!book) return res.status(404).send('Kitap bulunamadi.');
    
    const comment = book.comments.id(req.params.commentId);
    if (!comment) return res.status(404).send('Yorum bulunamadi.');
    
    if (comment.user.toString() !== req.user._id.toString()) return res.status(403).send('Yetkiniz yok.');
    
    book.comments.remove(comment._id);
    await book.save();
    
    res.send(comment);
}

exports.update_comment = async (req, res) => {
    const user = req.user._id;
    const text = req.body.text;
    const bookId = req.params.bookId;
    const commentId = req.params.commentId;

    const book = await Book.findById(bookId);
    if (!book) return res.status(404).send('Kitap bulunamadi.');
    
    const comment = book.comments.id(commentId);
    if (!comment) return res.status(404).send('Yorum bulunamadi.');
    
    if (comment.user.toString() !== user.toString()) return res.status(403).send('Yetkiniz yok.');
    
    const { error } = validateComment({ user: user, bookId: bookId, text: text });
    if (error) return res.status(400).send(error.details[0].message);
    
    comment.text = req.body.text;
    await comment.save();
    
    res.send(comment);
}

exports.get_comment = async (req, res) => {
    const book = await Book.findById(req.params.bookId).populate('comments.user', 'username');
    if (!book) return res.status(404).send('Kitap bulunamadi.');
    
    const comment = book.comments.id(req.params.commentId);
    if (!comment) return res.status(404).send('Yorum bulunamadi.');
    
    res.send(comment);
}

exports.get_comments_by_user = async (req, res) => {
    const user = req.user._id

    const comments = await Comment.find({ user: user }).populate('book', 'name');
    if (!comments) return res.status(404).send('Yorum bulunamadi.');
    
    res.send(comments);
}

exports.get_comments_by_book = async (req, res) => {
    const bookId = req.params.bookId

    const comments = await Comment.find({ book: bookId }).populate('user', 'username');
    if (!comments) return res.status(404).send('Yorum bulunamadi.');
    
    res.send(comments);
}

