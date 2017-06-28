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
