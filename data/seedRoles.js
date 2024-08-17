const Role = require('../models/role');

(async () => {
    await Role.deleteMany({});

    const roles = [
        { roleName: 'admin' },
        { roleName: 'user' },
        { roleName: 'moderator' },
        { roleName: 'bookstoreOwner' }
    ];

    await Role.insertMany(roles);

    console.log("Roller Oluşturuldu!");
    
})()

