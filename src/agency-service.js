const cote = require('cote')

const Agency = require('./agency')

const responder = new cote.Responder({ name: 'agency responder', key: 'agency' })
const logRequester = new cote.Requester({ name: 'log requester', key: 'log' })

responder.on('index', ({ type }, cb) => {
  return Agency.findAll()
}

responder.on('show', ({ type, id }, cb) => {
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
