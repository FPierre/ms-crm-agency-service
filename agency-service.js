const cote = require('cote')

const responder = new cote.Responder({ name: 'agency responder', key: 'agency' })
const requester = new cote.Requester({ name: 'log requester', key: 'log' })

// DB mocking
const agencies = [
  { id: 1, userId: 1, name: 'Agency 1', lat: 1.11, lng: 2.00, commercialStatus: 'client' }
]

responder.on('index', ({ type }, cb) => cb(agencies))

responder.on('create', ({ type, agency }, cb) => {
  // Log entry
  requester.send({ type: 'create', event: 'create' }, res => {
    agencies.push(agency)
    cb(agency)
  })
})

responder.on('update', ({ type, agency }, cb) => {
  // Log entry
  requester.send({ type: 'create', event: 'update' }, res => {
    const agencyIndex = agencies.findIndex(a => a.id === agency.id)

    if (agencyIndex) {
      agencies[agencyIndex] = agency
      cb(agency)
    } else {
      cb({})
    }
  })
})

responder.on('delete', ({ type, agencyIndex }, cb) => {
  // Log entry
  requester.send({ type: 'create', event: 'delete' }, res => {
    agencies.splice(agencyIndex, 1)
    cb({})
  })
})
