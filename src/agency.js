const mongoose = require('mongoose')
const diffHistory = require('mongoose-diff-history/diffHistory')

const agencySchema = new mongoose.Schema({
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
  country: {
    type: String,
    required: true,
    maxlength: 255,
    trim: true
  },
  city: {
    type: String,
    required: true,
    maxlength: 255,
    trim: true
  },
  zipCode: {
    type: Number,
    required: true,
    maxlength: 5,
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
  website: {
    type: String,
    maxlength: 255,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  _algoliaPlaceId: {
    type: String,
    required: true
  },
  _authorId: {
    type: String,
    required: true
  },
  _responsibleId: {
    type: String,
    required: true
  }
})

agencySchema.plugin(diffHistory.plugin)

const Agency = mongoose.model('Agency', agencySchema)

module.exports = Agency
