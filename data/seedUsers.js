const User = require('../models/user');
const Role = require('../models/role');

(async () => {
    // await User.deleteMany({});

    const roles = await Role.find({});

    const users = [
        { username: 'admin', email: 'admin@mail.com', password: '123123123', roles: [roles.find(role => role.roleName === 'admin')?._id] },
        { username: 'user', email: 'user@mail.com', password: '123123123', roles: [roles.find(role => role.roleName === 'user')?._id] },
        { username: 'moderator', email: 'moderator@mail.com', password: '123123123', roles: [roles.find(role => role.roleName === 'moderator')?._id] },
        { username: 'bookstoreOwner', email: 'bookstoreOwner@mail.com', password: '123123123', roles: [roles.find(role => role.roleName === 'bookstoreOwner')?._id] }
    ];

    await User.insertMany(users);

    console.log('Kullanıcılar Oluşturuldu!');

})();