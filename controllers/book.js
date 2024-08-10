const { Book, validateBook, validateUpdateBook } = require('../models/book');

exports.post_book = async (req, res) => {
    const { name, author, page, releaseDate, language, category, comments} = req.body
    const addedBy = req.user._id

    const { error } = validateBook({ name, author, page, releaseDate, language, category, addedBy, comments });
    if (error) return res.status(400).send(error.details[0].message);
    
    let book = new Book({
        name: name,
        author: author,
        page: page,
        releaseDate: releaseDate,
        language: language,
        category: category,
        addedBy: addedBy
    });
    
    book = await book.save();
    res.send(book);
}

exports.put_book = async (req, res) => {
    const { name, author, page, releaseDate, language, category } = req.body;
    
    const { error } = validateUpdateBook(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    const book = await Book.findByIdAndUpdate(req.params.id, {
        name: name,
        author: author,
        page: page,
        releaseDate: releaseDate,
        language: language,
        category: category
    }, { new: true });
    
    if (!book) return res.status(404).send("Kitap bulunamadi.");
    
    res.send(book);
}

exports.delete_book = async (req, res) => {
    const book = await Book.findByIdAndDelete(req.params.id);
    
    if (!book) return res.status(404).send("Kitap bulunamadi.");
    
    res.send(book);
}

exports.get_books = async (req, res) => {
    const books = await Book.find().populate("comments.user", "username");
    res.send(books);
}

exports.get_book = async (req, res) => {
    const book = await Book.findById(req.params.id).populate("comments.user", "username");
    if (!book) return res.status(404).send("Kitap bulunamadi.");
    res.send(book);
}