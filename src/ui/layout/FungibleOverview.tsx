import * as React from 'react'
import labels from '../../labels'
import FungibleBalanceList from './FungibleBalanceList'
import { useSelector } from 'react-redux'
import { getMainAccount } from '../../store/getter'

function FungibleOverview() {
  const { account } = useSelector(getMainAccount)
  return (
    <FungibleBalanceList
      title={labels.FUNGIBLE_BALANCE}
      publicKey={account.publicKey}
    />
  )
}

export default FungibleOverview
