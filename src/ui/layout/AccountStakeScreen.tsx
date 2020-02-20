import * as React from 'react'
import { useSelector } from 'react-redux'
import { getMainAccount } from '../../store/getter'
import { useTranslation } from 'react-i18next'
import { Route, useRouteMatch, useHistory } from 'react-router-dom'
import Overview from './AccountStakeOverviewScreen'
import StakeCreate from './AccountStakeCreateScreen'
import StakeDetail from './AccountStakeDetailScreen'
import Unstake from './AccountStakeUnstakeScreen'

function AccountStakingScreen() {
  const { account } = useSelector(getMainAccount)
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
