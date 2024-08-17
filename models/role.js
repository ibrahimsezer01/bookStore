const mongoose = require('mongoose');

const rolesSchema = new mongoose.Schema({
    roleName: {
        type: String,
        required: true,
        unique: true,
        enum: ['admin', 'user', 'moderator', 'bookstoreOwner']
    }
});

const Role = mongoose.model('Role', rolesSchema);

module.exports = Role;
