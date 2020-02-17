import * as React from 'react'
import { useSelector } from 'react-redux'
import { getMainAccount } from '../../store/getter'
import { NavigationLayout } from '../presentational/MainLayout'
import ConnectedNavigationBackButton from './NavigationButtons'
import { useTranslation } from 'react-i18next'

function AccountStakingScreen() {
  const { account } = useSelector(getMainAccount)
  const { t } = useTranslation()

  return (
    <NavigationLayout
      title={t('STACK_TITLE')}
      renderLeft={() => <ConnectedNavigationBackButton />}
    >
      <div style={{ margin: '0 auto' }}>
        <p>Staking screen</p>
      </div>
    </NavigationLayout>
  )
}

export default AccountStakingScreen
