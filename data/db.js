const mongoose = require('mongoose');
const logger = require('../middlewares/logger')
const config = require("config")

const username = config.get("db.username")
const password = config.get("db.password")
const database = config.get("db.database")
const cluster = config.get("db.cluster")

const connect = async () => {
    await mongoose.connect(`mongodb+srv://${username}:${password}@${cluster}.jv1fs.mongodb.net/${database}?retryWrites=true&w=majority`);
    logger.info("Bağlanti oluşturuldu");
};

connect();
