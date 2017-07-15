const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const dbUrl = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_URL}:${process.env.DB_PORT}/${process.env.DB_NAME}`

exports.connect = () => mongoose.connect(dbUrl)
