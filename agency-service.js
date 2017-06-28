const cote = require('cote')
const responder = new cote.Responder({ name: 'agency responder' })

// DB mocking
const agencies = [
  { id: 1, name: 'Agency 1', userId: 1 }
]

responder.on('index', ({ type }, cb) => cb(agencies))

responder.on('create', ({ type, agency }, cb) => {
  agencies.push(agency)
  cb(agency)
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
