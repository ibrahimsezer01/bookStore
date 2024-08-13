const { Book, validateBook, validateUpdateBook } = require('../models/book');
const { Category } = require('../models/category');
const { upload_book_images, delete_book_images } = require('./bookImages');

exports.post_book = async (req, res) => {
    const { name, author, page, releaseDate, language, category } = req.body
    const images = req.files
    const addedBy = req.user._id

    const { error } = validateBook({ name, author, page, releaseDate, language, category, images, addedBy });
    if (error) return res.status(400).send(error.details[0].message);

    const catId = await Category.findOne({ name: category }).select("_id")
    if (!catId) return res.status(400).send('Kategori bulunamadi.');

    const uploadPromises = images.map(file => { return upload_book_images(file) });
    const results = await Promise.all(uploadPromises);
    const imageUrls = results.map(result => result.url);
    const imagesPublicId = results.map(result => result.public_id);

    let book = new Book({
        name: name,
        author: author,
        page: page,
        releaseDate: releaseDate,
        language: language,
        category: catId,
        images: imageUrls,
        images_public_id: imagesPublicId,
        addedBy: addedBy
    });

    book = await book.save();
    res.send(book);
}

exports.put_book = async (req, res) => {
    const { name, author, page, releaseDate, language, category } = req.body;
    const addedBy = req.user._id;
    const images = req.files

    const { error } = validateUpdateBook({ name, author, page, releaseDate, language, category, images });
    if (error) return res.status(400).send(error.details[0].message);

    let book = await Book.findById(req.params.id)
    if (!book) return res.status(404).send("Kitap bulunamadi.");

    if (book.addedBy.toString() !== addedBy.toString()) return res.status(403).send('Yetkiniz yok.');

    const catId = await Category.findOne({ name: category }).select("_id")
    if (!catId) return res.status(400).send('Kategori bulunamadi.');

    if (images && images.length > 0) {
        const deletePromises = book.images_public_id.map(public_id => delete_book_images(public_id));
        await Promise.all(deletePromises);

        const uploadPromises = images.map(file => { return upload_book_images(file) });
        const results = await Promise.all(uploadPromises);

        var imageUrls = results.map(result => result.url);
        var imagesPublicId = results.map(result => result.public_id);
    }

    book.name = name;
    book.author = author;
    book.page = page;
    book.releaseDate = releaseDate;
    book.language = language;
    book.category = catId;
    book.images = imageUrls;
    book.images_public_id = imagesPublicId;

    await book.save();
    res.send(book);
}

exports.delete_book = async (req, res) => {
    const user = req.user._id

    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).send("Kitap bulunamadi.");

    if (book.addedBy.toString() !== user.toString()) return res.status(403).send('Yetkiniz yok.');

    await book.deleteOne()
    const deletePromises = book.images_public_id.map(public_id => delete_book_images(public_id));
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