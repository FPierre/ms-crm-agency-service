const cote = require('cote')

const Agency = require('./agency')

const responder = new cote.Responder({ name: 'agency responder', key: 'agency' })
const requester = new cote.Requester({ name: 'log requester', key: 'log' })

// DB mocking
const activities = {
  0: 'frenchFriesStand',
  1: 'candyFlossStand'
}

const commercialStatus: {
  0: 'client',
  1: 'prospect',
  2: 'inactive',
  3: 'oldCustomer'
}

responder.on('index', ({ type }, cb) => {
  return Agency.findAll()
}

responder.on('show', ({ type, id }, cb) => {
  return Agency.findById(id)
})

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
