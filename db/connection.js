const mongoose = require('mongoose')

const mongodbUrl = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_URL}:${DB_PORT}/${DB_NAME}`

exports.connect = () => mongoose.connect(mongodbUrl)
