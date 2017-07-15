const algoliasearch = require('algoliasearch')
const moment = require('moment')
const env = require('../env/dev.env.js')

const client = algoliasearch(env.algoliaAppId, env.algoliaApiKey)
const index = client.initIndex(env.algoliaIndex)

function serialize(agency) {
  return {
    objectID: agency._id,
    name: agency.name,
    phone: agency.phone,
    street: agency.street,
    country: agency.country,
    city: agency.city,
    zipCode: agency.zipCode,
    website: agency.website,
    activities: agency.activities,
    commercialStatus: agency.commercialStatus,
    createdAt: moment(agency.createdAt).unix(),
    updatedAt: moment(agency.updatedAt).unix(),
    _authorId: agency._authorId,
    _responsibleId: agency._responsibleId,
    _geoloc: {
      lat: agency.lat,
      lng: agency.lng
    }
  }
}

module.exports = {
  algoliaClient: index,
  algoliaSerialize: serialize
}
