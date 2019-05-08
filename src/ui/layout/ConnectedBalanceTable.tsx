import * as React from 'react'
import BalanceTable, { PropTypes } from '../presentational/BalanceTable'
import { connect } from 'react-redux'
import { fetchBalance } from '../action'
import { getBalanceByPublicKey } from '../../store/getter'

type OwnProps = {
  publicKey: string
}

type ConnectedProps = {
  onMount: (publicKey: string) => ReturnType<typeof fetchBalance>
}

class ConnectedBalanceTable extends React.PureComponent<
  OwnProps & ConnectedProps & PropTypes
> {
  componentWillMount() {
    this.props.onMount(this.props.publicKey)
  }
  render() {
    return (
      <BalanceTable
        showLink={false}
        balances={this.props.balances}
        fetched={this.props.fetched}
      />
    )
  }
}

export default connect(
  getBalanceByPublicKey,
  { onMount: fetchBalance }
)(ConnectedBalanceTable)
