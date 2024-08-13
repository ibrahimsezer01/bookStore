const mongoose = require("mongoose")
const config = require("../config/default")

const username = config.db.username
const password = config.db.password
const database = config.db.database
const cluster = config.db.cluster

const connect = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${username}:${password}@${cluster}.jv1fs.mongodb.net/${database}`)
        console.log("Bağlanti oluşturuldu");
    } catch (error) {
        console.log(error);
    }
}

module.exports = connect