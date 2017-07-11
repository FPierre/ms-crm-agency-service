const mongoose = require('mongoose')
const env = require('../env/dev.env.js')

mongoose.Promise = global.Promise

const mongodbURL = `mongodb:${env.dbUser}:${env.dbSecret}@${env.dbUrl}:${env.dbPort}/${env.dbName}`

mongoose.connect(mongodbURL).then(() => {}).catch(err => console.log(err))
