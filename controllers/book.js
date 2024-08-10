const { Book, validateBook, validateUpdateBook } = require('../models/book');

exports.post_book = async (req, res) => {
    const { name, author, page, releaseDate, language, category} = req.body
    const addedBy = req.user._id

    const { error } = validateBook({ name, author, page, releaseDate, language, category, addedBy });
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
    const user = req.user._id;
    
    const { error } = validateUpdateBook(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let book = await Book.findById(req.params.id)
    if (!book) return res.status(404).send("Kitap bulunamadi.");
    
    if (book.user.toString() !== user.toString()) return res.status(403).send('Yetkiniz yok.');
    
    book.name = name;
    book.author = author;
    book.page = page;
    book.releaseDate = releaseDate;
    book.language = language;
    book.category = category;

    await book.save();

    res.send(book);
}

exports.delete_book = async (req, res) => {
    const user = req.user._id

    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).send("Kitap bulunamadi.");

    if (book.user.toString() !== user.toString()) return res.status(403).send('Yetkiniz yok.');
    
    await book.deleteOne()
    
    res.send({ message: "Silme İşlemi Başarili" });
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