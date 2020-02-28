import * as React from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import Overview from './AccountDexOverviewScreen'

function AccountDexScreen() {
  const match = useRouteMatch()

  if (!match) {
    return null
  }

  return (
    <>
      <Route path={`${match.path}`} component={Overview} exact />
    </>
  )
}

export default AccountDexScreen
