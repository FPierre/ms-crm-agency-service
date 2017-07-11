const Agency = require('../src/agency')

const agencyOne = new Agency({
  name: 'Frites Momo',
  phone: '0123326894',
  street: '121 Boulevard du Montparnasse',
  lat: 48.841920,
  lng: 2.330772,
  commercialStatus: 'customer',
  activities: 'frenchFriesStand',
  _cityId: 1,
  _authorId: 1,
  _responsibleId: 1,
})

agencyOne.save(err => {
  if (err) {
    throw err
  }
})
