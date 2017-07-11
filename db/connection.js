const mongoose = require('mongoose')
const env = require('../env/dev.env.js')
const { init } = require('./init')

mongoose.Promise = global.Promise

const mongodbURL = `mongodb://${env.dbUser}:${env.dbSecret}@${env.dbUrl}:${env.dbPort}/${env.dbName}`

mongoose.connect(mongodbURL).then(() => { init() }).catch(err => console.log(err))
