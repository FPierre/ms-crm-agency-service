const cote = require('cote')

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

const agencies = [
  { id: 1, authorId: 1, responsibleId: 1, name: 'Agency 1', activities: [activities[0]], lat: 1.11, lng: 2.00, phone: '', commercialStatus: commercialStatus[1] }
]

responder.on('index', ({ type }, cb) => cb(agencies))

responder.on('show', ({ type, id }, cb) => {
  const agency = agencies.find(a => a.id === id)

  return new Promise((resolve, reject) => {
    if (agency) {
      resolve(agency)
    } else {
      reject('rejected')
    }
  })
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
