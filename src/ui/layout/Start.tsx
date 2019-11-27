import * as React from 'react'
import GetStarted from './GetStarted'
import Login from './LogIn'
import Home from './Home'
import AuthenticationStateContext from '../../context/AuthenticationState'

export default function Start() {
  const name = React.useContext(AuthenticationStateContext)

  if (name === 'password') {
    return <Home />
  }

  if (name === 'hash') {
    return <Login message="Welcome back!" />
  }

  return <GetStarted />
}
