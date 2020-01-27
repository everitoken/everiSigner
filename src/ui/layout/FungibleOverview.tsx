import * as React from 'react'
import FungibleBalanceList from './FungibleBalanceList'
import { useSelector } from 'react-redux'
import { getMainAccount } from '../../store/getter'
import { useTranslation } from 'react-i18next'

function FungibleOverview() {
  const { account } = useSelector(getMainAccount)
  const { t } = useTranslation()

  return (
    <FungibleBalanceList
      title={t('FUNGIBLE_BALANCE')}
      publicKey={account.publicKey}
    />
  )
}

export default FungibleOverview
