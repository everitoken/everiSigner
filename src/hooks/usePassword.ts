import * as React from 'react'
import createPersistedState from 'use-persisted-state'
const usePasswordHashState = createPersistedState('passwordhash')

type ClearPassword = () => void
type ClearHash = ClearPassword
type SetPassword = (data: string) => void
type SetHash = SetPassword

const usePassword = (
  initialHash: string
): [string, string, SetHash, ClearHash, SetPassword, ClearPassword] => {
  const [hash, setHash]: [
    string,
    (hash: string) => void
  ] = usePasswordHashState(initialHash || '')
  const [password, setPassword] = React.useState('')

  const clearHash = () => setHash('')
  const clearPassword = () => setPassword('')

  return [hash, password, setHash, clearHash, setPassword, clearPassword]
}

export default usePassword
