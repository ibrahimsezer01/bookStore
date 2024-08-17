const slugify = require('slugify')

const options = {
    replacement: '-',
    remove: undefined,
    lower: true,
    strict: true,
    locale: 'en',
    trim: true
}

function slugiField(text) {
    return slugify(text, options)
}

module.exports = slugiField