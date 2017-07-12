const cote = require('cote')
const { connect } = require('../db/connection')
const { init } = require('../db/init')
const Agency = require('./agency')

connect()
  // .then(() => init())
  // .catch(err => console.log(err))

const responder = new cote.Responder({ name: 'agency responder', key: 'agency' })
const logRequester = new cote.Requester({ name: 'log requester', key: 'log' })

responder.on('index', () => {
  return Agency.find({}, ['name', 'activities', 'commercialStatus', '_responsibleId', 'createdAt'])
})

responder.on('show', ({ id }) => {
  return Agency.findById(id)
})

responder.on('create', ({ type, agency }, cb) => {
  logEntry({}, agency, 'create')
})

responder.on('update', ({ type, agency }, cb) => {
  Agency.findById(agency.id).then(agency => {
    logEntry({}, agency, 'update')
    cb(agency)
  })
})

responder.on('delete', ({ type, agencyIndex }, cb) => {

})

function logEntry (user, object, event) {
  return logRequester.send({ type: 'create', user, object, event })
}
