const cote = require('cote')
const { connect } = require('../db/connection')
const { init } = require('../db/init')
// const { algoliaClient, algoliaSerialize } = require('../api/algolia')
const Agency = require('./agency')

connect()
  // .then(() => init())
  // .catch(err => console.log(err))

const app = require('http').createServer(() => {})
const io = require('socket.io').listen(app)

app.listen(5554)

const sockend = new cote.Sockend(io, { name: 'agency sockend', namespace: 'agencies' })
const responder = new cote.Responder({ name: 'agency responder', namespace: 'agencies', respondsTo: ['index'] })

// const responder = new cote.Responder({ name: 'agency responder', key: 'agency' })
const logRequester = new cote.Requester({ name: 'log requester', key: 'log' })
const userRequester = new cote.Requester({ name: 'user requester', key: 'user' })

responder.on('index', ({ page }) => {
  const select = ['name', 'activities', 'commercialStatus', '_responsibleId', 'createdAt']

  return Agency.paginate({}, { select, page, limit: 1 })

  /*
  const promises = []

  Agency.paginate({}, { select, page: 1, limit: 1 })
    .then(paginatedAgencies => {
      for (let agency of paginatedAgencies.docs) {
        const promise = userRequester.send({ type: 'show', id: agency._responsibleId })
          .then(user => {

          })
          .catch(err => console.log(err))

        promises.push(promise)
      }

      Promise.all(promises)
        .then((t) => {
           cb(t)
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
  */
})

responder.on('show', ({ id }) => {
  return Agency.findById(id)
})

responder.on('create', ({ agency, user }) => {
  // logEntry(user, agency, 'create')

  /*
  algoliaClient.addObject(algoliaSerialize(agency), (err, content) => {
    if (err) {
      console.log(err)
    }
  })
  */

  return new Agency(agency).save()
})

responder.on('update', ({ agency }) => {
  Agency.findById(agency.id)
    .then(agency => {
      logEntry({}, agency, 'update')
      cb(agency)
    })
})

responder.on('delete', ({ id }) => {

})

function logEntry (user, object, event) {
  return logRequester.send({ type: 'create', user, object, event })
}
