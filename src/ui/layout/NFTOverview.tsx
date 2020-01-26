import * as React from 'react'
import labels from '../../labels'
import { connect } from 'react-redux'
import { AccountStateType } from '../../store/reducer/accounts'
import { getMainAccount } from '../../store/getter'
import NFTListScreen from './NFTListScreen'

type FungibleOverviewPropTypes = { account: AccountStateType }

class FungibleOverview extends React.PureComponent<FungibleOverviewPropTypes> {
  render() {
    return (
      <NFTListScreen
        title={labels.NFTs_LIST}
        publicKey={this.props.account.publicKey}
      />
    )
  }
}

export default connect(getMainAccount)(FungibleOverview)
