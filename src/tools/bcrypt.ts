import bcrypt from 'bcryptjs'

const hashPassword = async (password: string, saltRounds = 10) => {
  return await bcrypt.hash(password, saltRounds)
}

const comparePassword = async function (
  incomingPassword: string,
  actualPassword?: string
) {
  if (!actualPassword) return Promise.resolve(false)
  return await bcrypt.compare(incomingPassword, actualPassword)
}

export { hashPassword, comparePassword }
