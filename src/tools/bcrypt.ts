import bcrypt from 'bcryptjs'

const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10)
}

const comparePassword = async function (
  incomingPassword: string,
  actualPassword?: string
) {
  if (!actualPassword) return Promise.resolve(false)
  return await bcrypt.compare(incomingPassword, actualPassword)
}

export { hashPassword, comparePassword }
