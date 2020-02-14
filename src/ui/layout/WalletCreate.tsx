import * as React from 'react'
import ConnectedNavigationBackButton from './NavigationButtons'
import { NavigationLayout } from '../presentational/MainLayout'
import AccountCreate from '../layout/AccountCreate'
import { useTranslation } from 'react-i18next'

function WalletCreate() {
  const { t } = useTranslation()

  return (
    <NavigationLayout
      title={t('SET_AS_NEW_WALLET')}
      renderLeft={() => <ConnectedNavigationBackButton />}
    >
      <AccountCreate />
    </NavigationLayout>
  )
}

export default WalletCreate
