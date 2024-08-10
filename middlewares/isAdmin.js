const { User } = require("../models/user")

const isAdmin = async (req, res, next) => {
        const userId = req.user._id;

        const user = await User.findById(userId)
        if (!user) return res.status(404).send('Kullanici bulunamadi.');

        if (!user.isAdmin) return res.status(403).send('Admin rolu gereklidir.');

        next();    
};

module.exports = isAdmin;