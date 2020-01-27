import * as React from 'react'
import { useSelector } from 'react-redux'
import { getMainAccount } from '../../store/getter'
import PayeeCode from '../presentational/PayeeCode'
import { NavigationLayout } from '../presentational/MainLayout'
import ConnectedNavigationBackButton from './NavigationButtons'
import { useTranslation } from 'react-i18next'

function AccountPayeeCode() {
  const { account } = useSelector(getMainAccount)
  const { t } = useTranslation()

  return (
    <NavigationLayout
      title={t('PAYEE_CODE')}
      renderLeft={() => <ConnectedNavigationBackButton />}
    >
      <div style={{ margin: '0 auto' }}>
        <PayeeCode publicKey={account.publicKey} />
      </div>
    </NavigationLayout>
  )
}

export default AccountPayeeCode
