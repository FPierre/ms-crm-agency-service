const cote = require('cote')
const responder = new cote.Responder({ name: 'agency create responder', key: 'create' })

// DB mocking
const agencies = []

responder.on('create', ({ type, agency }, cb) => cb(agencies.push(agency)))
