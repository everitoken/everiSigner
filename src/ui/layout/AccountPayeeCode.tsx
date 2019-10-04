import * as React from 'react'
import { useSelector } from 'react-redux'
import { getMainAccount } from '../../store/getter'
import PayeeCode from '../presentational/PayeeCode'
import { NavigationLayout } from '../presentational/MainLayout'
import ConnectedNavigationBackButton from './NavigationButtons'
import labels from '../../labels'

function AccountPayeeCode() {
  const { account } = useSelector(getMainAccount)
  return (
    <NavigationLayout
      title={labels.PAYEE_CODE}
      renderLeft={() => <ConnectedNavigationBackButton />}
    >
      <div style={{ margin: '0 auto' }}>
        <PayeeCode publicKey={account.publicKey} />
      </div>
    </NavigationLayout>
  )
}

export default AccountPayeeCode
