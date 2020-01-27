import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import { IconButton } from '@material-ui/core'
import RefreshIcon from '@material-ui/icons/Refresh'

import InvalidRoute from './InvalidRoute'
import { NavigationLayout } from '../presentational/MainLayout'
import ConnectedNavigationBackButton from './NavigationButtons'
import { getAccountById } from '../../store/getter'
import AccountBalance from './FungibleBalanceList'
import { fetchBalance } from '../action'
import { useTranslation } from 'react-i18next'
import { AppState } from '../../store/reducer'
import useAuthenticationState from '../../hooks/useAuthenticationState'

const RefreshButton = (props: { onRefresh: () => void }) => (
  <IconButton onClick={props.onRefresh}>
    <RefreshIcon fontSize="large" />
  </IconButton>
)

function AccountBalanceScreen() {
  const { t } = useTranslation()
  const { id } = useParams()
  const account = useSelector((state: AppState) =>
    getAccountById(state, { id: id || '' })
  )

  const dispatch = useDispatch()
  const [state] = useAuthenticationState()
  if (state !== 'password') {
    return (
      <InvalidRoute message="everiSigner needs to be unlock in order to show account list." />
    )
  }

  function handleRefresh() {
    if (account) {
      dispatch(fetchBalance(account.publicKey))
    }
  }

  return (
    <NavigationLayout
      title={t('FUNGIBLE_BALANCE')}
      renderLeft={() => <ConnectedNavigationBackButton />}
      renderRight={() => <RefreshButton onRefresh={handleRefresh} />}
    >
      {account ? (
        <div style={{ flex: '1 1 auto', padding: 16 }}>
          <AccountBalance publicKey={account.publicKey} />
        </div>
      ) : null}
    </NavigationLayout>
  )
}

export default AccountBalanceScreen
