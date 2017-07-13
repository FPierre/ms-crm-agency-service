const algoliasearch = require('algoliasearch')
const env = require('../env/dev.env.js')
const client = algoliasearch(env.algoliaAppId, env.algoliaApiKey)
const index = client.initIndex(env.algoliaIndex)

module.exports = index
