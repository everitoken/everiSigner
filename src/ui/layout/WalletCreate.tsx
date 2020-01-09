import * as React from 'react'
import ConnectedNavigationBackButton from './NavigationButtons'
import { NavigationLayout } from '../presentational/MainLayout'
import AccountCreate from '../layout/AccountCreate'

function WalletCreate() {
  return (
    <NavigationLayout
      title="设置为新钱包"
      renderLeft={() => <ConnectedNavigationBackButton />}
    >
      <AccountCreate />
    </NavigationLayout>
  )
}

export default WalletCreate
