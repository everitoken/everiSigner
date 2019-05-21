import * as React from 'react'
import BalanceList, { PropTypes } from '../presentational/BalanceList'
import { connect } from 'react-redux'
import { fetchBalance } from '../action'
import { getBalanceByPublicKey } from '../../store/getter'

type OwnProps = {
  publicKey: string
}

type ConnectedProps = {
  onMount: (publicKey: string) => ReturnType<typeof fetchBalance>
}

class ConnectedBalanceList extends React.PureComponent<
  OwnProps & ConnectedProps & PropTypes
> {
  componentWillMount() {
    this.props.onMount(this.props.publicKey)
  }
  render() {
    return (
      <BalanceList
        {...this.props}
        balances={this.props.balances}
        fetching={this.props.fetching}
      />
    )
  }
}

export default connect(
  getBalanceByPublicKey,
  { onMount: fetchBalance }
)(ConnectedBalanceList)
