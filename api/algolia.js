const algoliasearch = require('algoliasearch')
const moment = require('moment')
const dotenv = require('dotenv')

dotenv.config()

const client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_API_KEY)
const index = client.initIndex(process.env.ALGOLIA_INDEX)

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
