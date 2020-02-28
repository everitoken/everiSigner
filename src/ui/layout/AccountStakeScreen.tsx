import * as React from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import Overview from './AccountStakeOverviewScreen'
import StakeCreate from './AccountStakeCreateScreen'
import StakeDetail from './AccountStakeDetailScreen'
import Unstake from './AccountStakeUnstakeScreen'

function AccountStakingScreen() {
  const match = useRouteMatch()

  if (!match) {
    return null
  }

  return (
    <>
      <Route path={`${match.path}`} component={Overview} exact />
      <Route path={`${match.path}/create`} component={StakeCreate} />
      <Route path={`${match.path}/detail`} component={StakeDetail} />
      <Route path={`${match.path}/unstake`} component={Unstake} />
    </>
  )
}

export default AccountStakingScreen
