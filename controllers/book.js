const { Book, validateBook, validateUpdateBook } = require('../models/book');
const { Category } = require('../models/category');
const { upload_book_images, delete_book_images } = require('./bookImages');

exports.post_book = async (req, res) => {
    const { name, author, page, releaseDate, language, catName } = req.body
    const files = req.files
    const addedBy = req.user._id

    const { error } = validateBook({ name, author, page, releaseDate, language, catName, files, addedBy });
    if (error) return res.status(400).send(error.details[0].message);

    const catId = await Category.findOne({ name: catName }).select("_id")
    if (!catId) return res.status(400).send('Kategori bulunamadi.');

    const uploadPromises = files.map(file => { return upload_book_images(file) });
    const imageUrls = await Promise.all(uploadPromises);

    let book = new Book({
        name: name,
        author: author,
        page: page,
        releaseDate: releaseDate,
        language: language,
        category: catId,
        images: imageUrls,
        addedBy: addedBy
    });

    book = await book.save();
    res.send(book);
}

exports.put_book = async (req, res) => {
    const { name, author, page, releaseDate, language, catName } = req.body;
    const user = req.user._id;
    const files = req.files

    const { error } = validateUpdateBook(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let book = await Book.findById(req.params.id)
    if (!book) return res.status(404).send("Kitap bulunamadi.");

    if (book.user.toString() !== user.toString()) return res.status(403).send('Yetkiniz yok.');

    const catId = await Category.findOne({ name: catName }).select("_id")
    if (!catId) return res.status(400).send('Kategori bulunamadi.');

    if (files && files.length > 0) {
        const oldImagesToDelete = book.images.filter(image => !files.map(file => file.filename).includes(image));
        const deletePromises = oldImagesToDelete.map(image => delete_book_images(image));
        await Promise.all(deletePromises);

        const uploadPromises = files.map(file => upload_book_images(file));
        const results = await Promise.all(uploadPromises);
        const imageUrls = results.map(result => result.secure_url);

        book.images = Array.from(new Set([...book.images, ...imageUrls]));
    } else {
        book.images = [];
    }

    book.name = name;
    book.author = author;
    book.page = page;
    book.releaseDate = releaseDate;
    book.language = language;
    book.category = catId;

    await book.save();
    res.send(book);
}

exports.delete_book = async (req, res) => {
    const user = req.user._id

    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).send("Kitap bulunamadi.");

    if (book.user.toString() !== user.toString()) return res.status(403).send('Yetkiniz yok.');

    await book.deleteOne()
    const deletePromises = book.images.map(image => delete_book_images(image));
    await Promise.all(deletePromises);

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