import * as React from 'react'
import MainLayout, { HeaderTitle } from '../presentational/MainLayout'
import { Route, RouteComponentProps } from 'react-router'
import AccountCreateScreen from './AccountCreateScreen'
import AccountListScreen from './AccountListScreen'
import AccountQRScreen from './AccountQRScreen'
import AccountBalanceScreen from './AccountBalanceScreen'
import AccountPrivateKeyScreen from './AccountPrivateKeyScreen'
import { useTranslation } from 'react-i18next'

type PropTypes = {}

export default function AccountScreen({
  match,
}: PropTypes & RouteComponentProps) {
  const { t } = useTranslation()

  return (
    <MainLayout
      renderLogo
      renderHead={() => <HeaderTitle title={t('ACCOUNT_DETAIL')} />}
    >
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
