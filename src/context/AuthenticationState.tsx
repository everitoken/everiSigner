import * as React from 'react'

import { ValidAuthenticatedStatusTypes } from '../types'
import { useSelector } from 'react-redux'

import { getAuthenticatedStatus } from '../store/getter'

const AuthenticationStateContext = React.createContext<
  ValidAuthenticatedStatusTypes
>('unknown')

type PropTypes = {
  children: React.ReactNode
}

export const AuthenticationStateProvider = (props: PropTypes) => {
  const state = useSelector(getAuthenticatedStatus)

  return (
    <AuthenticationStateContext.Provider value={state}>
      {props.children}
    </AuthenticationStateContext.Provider>
  )
}

export default AuthenticationStateContext
