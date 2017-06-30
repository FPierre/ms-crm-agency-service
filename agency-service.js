const cote = require('cote')
const responder = new cote.Responder({ name: 'agency responder' })
const requester = new cote.Requester({ name: 'log requester' })

// DB mocking
const agencies = [
  { id: 1, userId: 1, name: 'Agency 1', lat: 1.11, lng: 2.00, commercialStatus: 'client' }
]

responder.on('index', ({ type }, cb) => cb(agencies))

responder.on('create', ({ type, agency }, cb) => {
  const req = {
    type: 'create',
    log: { id: null, event: 'test', createdAt: Date.now() }
  }

  requester.send(req, (res) => {
    agencies.push(agency)
    cb(agency)
  })
})

responder.on('update', ({ type, agency }, cb) => {
  const agencyIndex = agencies.findIndex(a => a.id === agency.id)

  if (agencyIndex) {
    agencies[agencyIndex] = agency
    cb(agency)
  } else {
    cb({})
  }
})

responder.on('delete', ({ type, agencyIndex }, cb) => {
  agencies.splice(agencyIndex, 1)
  cb({})
})
