// import 'dotenv/config'
// import fastify, { FastifyInstance } from 'fastify'
// import tap from 'tap'
// import { App } from '../app'

// let app: FastifyInstance

// tap.test('It should setup successfully', async (t) => {
//   app = fastify()
//   const instance = new App(app)

//   await instance.bootstrap()
//   await instance.run()

//   t.pass('Server started successfully')
// })

// // tap.test('CORS plugin is registered', async (t) => {
// //   t.plan(1)

// //   app = fastify()
// //   const instance = new App(app)
// //   await instance.bootstrap()
// //   await instance.run()

// //   t.ok(app.hasDecorator('cors'), 'CORS plugin registered')
// // })

// tap.afterEach(async (t) => {
//   t.plan(1)

//   if (app) {
//     await app.close()
//     t.pass('Server connection closed')
//   } else {
//     t.pass('No server connection to close')
//   }
// })
