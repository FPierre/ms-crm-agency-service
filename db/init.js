const Agency = require('../src/agency')

exports.init = () => {
  const agencyOne = new Agency({
    name: 'Frites Momo',
    phone: '0123326894',
    street: '121 Boulevard du Montparnasse',
    lat: 48.841920,
    lng: 2.330772,
    commercialStatus: 'customer',
    activities: 'frenchFriesStand',
    _cityId: "5963e30a57e53e5ef6857439",
    _authorId: "5963e30a57e53e5ef6857439",
    _responsibleId: "5963e30a57e53e5ef6857439",
  })

  agencyOne.save(err => {
    if (err) {
      throw err
    }
  })
}
