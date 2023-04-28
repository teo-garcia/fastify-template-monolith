import { bootstrap } from 'app'
import tap from 'tap'

tap.test('It should setup successfully', async (t) => {
  const app = bootstrap()

  const response = await app.inject({
    method: 'GET',
    url: '/health',
  })

  t.equal(response.statusCode, 200)
  t.same(response.json(), { status: 'ok' })
})
