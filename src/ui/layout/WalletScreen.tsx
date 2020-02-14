import * as React from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import WalletCreate from './WalletCreate'
import WalletSetpassword from './WalletSetpassword'
import WalletModeDecision from './WalletModeDecision'
import MainLayout, { HeaderTitle } from '../presentational/MainLayout'
import WalletImport from './WalletImportScreen'
import { useTranslation } from 'react-i18next'

function WalletLayout() {
  const match = useRouteMatch()
  const { t } = useTranslation()

  if (!match) {
    return null
  }

  return (
    <MainLayout
      renderLogo
      renderHead={() => <HeaderTitle title={t('WALLET_SETUP')} />}
    >
      <Route path={`${match.path}/decide`} component={WalletModeDecision} />
      <Route path={`${match.path}/create`} component={WalletCreate} />
      <Route path={`${match.path}/import`} component={WalletImport} />
      <Route path={`${match.path}/setpassword`} component={WalletSetpassword} />
    </MainLayout>
  )
}

export default WalletLayout
