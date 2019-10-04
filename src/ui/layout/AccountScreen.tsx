import * as React from 'react'
import MainLayout, { HeaderTitle } from '../presentational/MainLayout'
import { Route, RouteComponentProps } from 'react-router'
import AccountCreateScreen from './AccountCreateScreen'
import AccountListScreen from './AccountListScreen'
import AccountQRScreen from './AccountQRScreen'
import AccountBalanceScreen from './AccountBalanceScreen'
import AccountPrivateKeyScreen from './AccountPrivateKeyScreen'

type PropTypes = {}

export default function AccountScreen({
  match,
}: PropTypes & RouteComponentProps) {
  return (
    <MainLayout renderLogo renderHead={() => <HeaderTitle title="账户" />}>
      <Route path={`${match.path}/create`} component={AccountCreateScreen} />
      <Route path={`${match.path}/list`} component={AccountListScreen} />
      <Route path={`${match.path}/:id/qr`} component={AccountQRScreen} />
      <Route
        path={`${match.path}/:id/balance`}
        component={AccountBalanceScreen}
      />
      <Route
        path={`${match.path}/:id/key`}
        component={AccountPrivateKeyScreen}
      />
    </MainLayout>
  )
}
