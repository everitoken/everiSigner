import * as React from 'react'
import { NavigationLayout } from '../presentational/MainLayout'
import ConnectedNavigationBackButton from './NavigationButtons'
import { useTranslation } from 'react-i18next'
import { useRouteMatch } from 'react-router-dom'

export default function Unstake() {
  const match = useRouteMatch()
  const { t } = useTranslation()

  if (!match) {
    return null
  }

  return (
    <NavigationLayout
      title={t('STACK_UNSTAKE_TITLE')}
      renderLeft={() => <ConnectedNavigationBackButton />}
    >
      <div style={{ margin: '0 auto' }}>
        <p>unstake</p>
      </div>
    </NavigationLayout>
  )
}
