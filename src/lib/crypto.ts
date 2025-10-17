import bcrypt from 'bcryptjs'
export function hashCode(code: string) {
  const salt = bcrypt.genSaltSync(10)
  return bcrypt.hashSync(code, salt)
}
export function verifyCode(code: string, hash: string) {
  return bcrypt.compareSync(code, hash)
}
function pad(n: number) { return n.toString().padStart(6,'0') }
export function gen6() { return pad(Math.floor(Math.random()*1_000_000)) }
