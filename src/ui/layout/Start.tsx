import * as React from 'react'
import {  useSelector } from 'react-redux'
import GetStarted from './GetStarted'
import Login from './LogIn'
import Home from './Home'
import { getStartScreenName } from '../../store/getter'

export default function Start() {
  const { name } = useSelector(getStartScreenName)
  if (name === 'HOME') {
    return <Home />
  }

  if (name === 'LOGIN') {
    return <Login message="Welcome back!" />
  }

  return <GetStarted />
}
