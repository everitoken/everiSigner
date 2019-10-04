import * as React from 'react'
import { noop } from 'lodash'
import useAccounts from '../hooks/useAccounts'

const AccountContext = React.createContext({
  accounts: [],
  main: [],
  create: noop,
  setMain: noop,
  remove: noop,
})

type PropTypes = {
  children: React.ReactNode
}

export const AccountContextProvider = (props: PropTypes) => {
  const [accounts, create, setMain, remove] = useAccounts()

  const main = accounts.filter(a => a.isMain)

  return (
    <AccountContext.Provider
      value={{ accounts, main, create, setMain, remove }}
    >
      {props.children}
    </AccountContext.Provider>
  )
}

export default AccountContext
