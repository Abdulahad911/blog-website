const mongoose = require("mongoose")

async function connecteToMongoDB(url) {
    return mongoose.connect(url)
}

module.exports = {
    connecteToMongoDB
}