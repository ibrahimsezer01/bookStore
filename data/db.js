const mongoose = require("mongoose")
const config = require("../config")

const username = config.db.username
const password = config.db.password
const database = config.db.database
const cluster = config.db.cluster

const connect = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${username}:${password}@${cluster}.amufmzi.mongodb.net/${database}?retryWrites=true&w=majority`)
        console.log("Bağlanti oluşturuldu");
    } catch (error) {
        console.log(error);
    }
}

module.exports = connect