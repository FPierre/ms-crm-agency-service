const { algoliaClient, algoliaSerialize } = require('../api/algolia')
const Agency = require('../src/agency')

exports.init = () => {
  const foireDuTrone = new Agency({
    name: 'Foire du Trône',
    phone: '0123326894',
    street: 'Porte Dorée',
    country: 'France',
    city: 'Paris',
    zipCode: 75012,
    lat: 48.8352,
    lng: 2.4061,
    website: 'www.foiredutrone.com',
    commercialStatus: 'customer',
    activities: 'frenchFriesStand',
    _algoliaPlaceId: "722737_264482297",
    _authorId: "5963e30a57e53e5ef6857439",
    _responsibleId: "5963e30a57e53e5ef6857439",
  })

  foireDuTrone.save(err => {
    if (err) {
      throw err
    }
  })

  const friterieDesLilas = new Agency({
    name: 'Friterie Des Lilas',
    phone: '0320429493',
    street: '40 Rue Saint-Gabriel',
    country: 'France',
    city: 'Lille',
    zipCode: 59042,
    lat: 50.6398,
    lng: 3.0866,
    website: 'www.friteriedeslilas.fr',
    commercialStatus: 'customer',
    activities: 'cottonCandyStand',
    _algoliaPlaceId: '77368545_40460390',
    _authorId: "5963e30a57e53e5ef6857439",
    _responsibleId: "5963e30a57e53e5ef6857439",
  })

  friterieDesLilas.save(err => {
    if (err) {
      throw err
    }
  })

  algoliaClient.addObjects([algoliaSerialize(foireDuTrone), algoliaSerialize(friterieDesLilas)], (err, content) => {
    if (err) {
      throw err
    }
  })
}
