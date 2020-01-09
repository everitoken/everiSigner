import * as React from 'react'
import AccountCreate from '../layout/AccountCreate'

import { NavigationLayout } from '../presentational/MainLayout'
import ConnectedNavigationBackButton from './NavigationButtons'

function AccountCreateScreen() {
  return (
    <NavigationLayout
      title="创建新账户"
      renderLeft={() => <ConnectedNavigationBackButton />}
    >
      <AccountCreate />
    </NavigationLayout>
  )
}

export default AccountCreateScreen
