import test from 'ava'
import cote from 'cote'

test('automatic pass', t => {
  t.pass()
})

/*
test.cb('create agency', t => {
  const requester = new cote.Requester({
    name: 'test user requester 1',
    namespace: 'user'
  })

  requester.send({ type: 'create' }, (err, user) => {
    t.is(user.balance, 30)
    t.truthy(user.id)
    t.end()
  })
})
*/
/*
test.cb('get agencies', t => {
  const requester = new cote.Requester({ name: 'agency requester', namespace: 'agencies' })

  requester.send({ type: 'create' }, (err, newAgency) => {
    console.log(newAgency)
  })
})
*/
test.cb('get agency', t => {
  const requester = new cote.Requester({
    name: 'agency requester',
    namespace: 'agencies'
  })

  requester.send({ type: 'create' }, (err, newAgency) => {
    t.truthy(newAgency._id)
  })
})
