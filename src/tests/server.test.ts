// TODO: Fix tests
// import tap from 'tap'
// import { bootstrap } from 'app'

// tap.test('server should start and listen on correct address', async (t) => {
//   const server = bootstrap()
//   const port = parseInt(process.env.SERVER_PORT as string)
//   const address = `http://localhost:${port}`

//   const response = await server.inject({
//     method: 'GET',
//     url: `${address}/health`,
//   })

//   t.equal(response.statusCode, 200)
//   t.same(response.json(), { status: 'ok' })
// })
