const { Category, validateCategory } = require('../models/category');


exports.post_category = async (req, res) => {
    const { name, description } = req.body;    
    const { error } = validateCategory(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    let category = await Category.findOne({ name: name });

    if (category) return res.status(400).send('Bu kategori zaten mevcut');
    
    category = new Category({
        name: name,
        description: description
    });

    await category.save();
    res.send(category);
}

exports.get_categories = async (req, res) => {
    const categories = await Category.find().sort('name');
    res.send(categories);
}

exports.put_category = async (req, res) => {
    const { name, description } = req.body;
    const { error } = validateCategory({ name });
    if (error) return res.status(400).send(error.details[0].message);
    
    const category = await Category.findByIdAndUpdate(req.params.id, { name: name, description: description }, { new: true });

    if (!category) return res.status(404).send('Kategori bulunamadi.');
    
    res.send(category);
}

exports.delete_category = async (req, res) => {
    const category = await Category.findByIdAndDelete(req.params.id);
    
    if (!category) return res.status(404).send('Kategori bulunamadi.');
    
    res.send(category);
}
