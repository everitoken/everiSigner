import * as React from 'react'
import * as PasswordService from '../service/PasswordService'

type FromPassword = (password: string) => void
type ClearHash = () => void

const usePasswordHash = (
  initialHash: string
): [string, FromPassword, ClearHash] => {
  const [hash, setHash] = React.useState(initialHash || '')
  const fromPassword: FromPassword = password =>
    setHash(PasswordService.hashPassword(password))

  const clear: ClearHash = () => setHash('')

  return [hash, fromPassword, clear]
}

export default usePasswordHash
