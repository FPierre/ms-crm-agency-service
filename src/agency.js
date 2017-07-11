const mongoose = require('mongoose')

const Schema = mongoose.Schema
mongoose.Promise = global.Promise

const agencySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  commercialStatus:
    type: String,
    required: true,
    enum: ['inactive', 'customer', 'prospect', 'old customer'],
    default: 'inactive'
  },
  activities: {
    type: String,
    required: true,
    enum: ['frenchFriesStand', 'cottonCandyStand']
  },
  street: {
    type: String,
    required: true,
    trim: true
  },
  lat: {
    type: Number,
    min: 0
  },
  lng: {
    type: Number,
    min: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  _cityId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  _authorId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  _responsibleId: {
    type: Schema.Types.ObjectId,
    required: true
  }
})

const Agency = mongoose.model('Agency', agencySchema)

module.exports = Agency
