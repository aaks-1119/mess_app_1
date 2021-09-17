const crypto = require('crypto')

const GenerateHash = (length: number): string => {
  const resetToken = crypto.randomBytes(length).toString('hex')
  return crypto.createHash('sha256').update(resetToken).digest('hex')
}

export default GenerateHash
