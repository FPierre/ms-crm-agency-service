const cote = require('cote')
const diffHistory = require('mongoose-diff-history/diffHistory')
const { connect } = require('../db/connection')
const { init } = require('../db/init')
const { algoliaClient, algoliaSerialize } = require('../api/algolia')
const Agency = require('./agency')

connect()
  // .then(() => init())
  // .catch(err => console.log(err))

const responder = new cote.Responder({ name: 'agency responder', key: 'agency' })
const logRequester = new cote.Requester({ name: 'log requester', key: 'log' })

responder.on('index', ({ page, limit }) => {
  const select = ['name', 'activities', 'commercialStatus', '_responsibleId', 'createdAt']

  return Agency.paginate({}, { select, page, limit })
})

responder.on('show', ({ id }) => {
  return Agency.findById(id)
})

responder.on('create', ({ agency, user }) => {
  // logEntry(user, agency, 'create')

  algoliaClient.addObject(algoliaSerialize(agency), (err, content) => {
    if (err) {
      console.log(err)
    }
  })

  return new Agency(agency).save()
})

responder.on('update', ({ agency }) => {
  console.log('update', agency)
  return Agency.findByIdAndUpdate(agency._id, agency)
})

responder.on('delete', ({ id }) => {

})

responder.on('history', ({ id }, cb) => {
  diffHistory.getHistories('Agency', id, 'name', (err, h) => {
    cb(h)
  })
})

function logEntry (user, object, event) {
  return logRequester.send({ type: 'create', user, object, event })
}
