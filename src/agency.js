const mongoose = require('mongoose')

const Schema = mongoose.Schema
mongoose.Promise = global.Promise

const agencySchema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 255,
    trim: true
  },
  phone: {
    type: String,
    maxlength: 12,
    trim: true
  },
  commercialStatus: {
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
    maxlength: 255,
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
    type: Number,
    required: true
  },
  _authorId: {
    type: Number,
    required: true
  },
  _responsibleId: {
    type: Number,
    required: true
  }
})

const Agency = mongoose.model('Agency', agencySchema)

module.exports = Agency
