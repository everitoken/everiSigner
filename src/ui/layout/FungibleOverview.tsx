import * as React from 'react'
import labels from '../../labels'
import FungibleBalanceList from './FungibleBalanceList'
import { connect } from 'react-redux'
import { AccountStateType } from '../../store/reducer/accounts'
import { getMainAccount } from '../../store/getter'

type FungibleOverviewPropTypes = { account: AccountStateType }

function FungibleOverview(props: FungibleOverviewPropTypes) {
  return (
    <FungibleBalanceList
      title={labels.FUNGIBLE_BALANCE}
      publicKey={props.account.publicKey}
    />
  )
}

export default connect(getMainAccount)(FungibleOverview)
