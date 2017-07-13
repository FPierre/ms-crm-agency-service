const cote = require('cote')
const { connect } = require('../db/connection')
const { init } = require('../db/init')
const Agency = require('./agency')
const algolia = require('../api/algolia')

connect()

const responder = new cote.Responder({ name: 'agency responder', key: 'agency' })
const logRequester = new cote.Requester({ name: 'log requester', key: 'log' })

responder.on('index', () => {
  return Agency.find({}, ['name', 'activities', 'commercialStatus', '_responsibleId', 'createdAt'])
})

responder.on('show', ({ id }) => {
  return Agency.findById(id)
})

responder.on('create', ({ agency, user }) => {
  // logEntry(user, agency, 'create')


  algolia.addObject(agency, (err, content) => {
    if (err) {
      console.log(err)
    }
  })

  return new Agency(agency).save()
})

responder.on('update', ({ agency }) => {
  Agency.findById(agency.id).then(agency => {
    logEntry({}, agency, 'update')
    cb(agency)
  })
})

responder.on('delete', ({ agencyId }) => {

})

function logEntry (user, object, event) {
  return logRequester.send({ type: 'create', user, object, event })
}
