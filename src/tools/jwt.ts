// import type { FastifyReply, FastifyRequest } from 'fastify'

// const verifyJWT = async (request: FastifyRequest) => {
//   if (!request.raw.headers.authorization) {
//     return Promise.reject(new Error('Missing token header'))
//   }

//   return new Promise(function (resolve, reject) {
//     request.jwtVerify(
//       request.raw.headers.authorization,
//       {},
//       function (err, decoded) {
//         if (err) {
//           return reject(err)
//         }
//         resolve(decoded)
//       }
//     )
//   })
//     .then(function (decoded) {
//       return level.get(decoded.user).then(function (password) {
//         if (!password || password !== decoded.password) {
//           throw new Error('Token not valid')
//         }
//       })
//     })
//     .catch(function (error) {
//       request.log.error(error)
//       throw new Error('Token not valid')
//     })
// }

// export { verifyJWT }
