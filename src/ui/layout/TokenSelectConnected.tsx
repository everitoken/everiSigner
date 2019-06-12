import * as React from 'react'
import { connect } from 'react-redux'
import { getForTokenSelect } from '../../store/getter'
import { fetchBalance } from '../action'
import TokenSelect from '../presentational/TokenSelect'
import { TokenDetail } from '../../types'
import { getEmptyEvtBalance } from '../util'

type OwnProps = {
  onTokenReceive: (token: TokenDetail) => void
}
type PropTypes = {
  publicKey: string
  fetching: boolean
  balances: TokenDetail[]
  onMount: typeof fetchBalance
}

class TokenSelectConnected extends React.PureComponent<PropTypes & OwnProps> {
  // Smart select which balance who display, e.g. priority Evt over others
  static selectCorrectBalance(balances: TokenDetail[]) {
    if (balances.length === 1) {
      return balances[0]
    }

    const evt = balances.find(b => b.id === 1)
    if (evt) {
      return evt
    }

    return getEmptyEvtBalance()
  }
  componentWillMount() {
    this.props.onMount(this.props.publicKey)
  }
  render() {
    const { fetching, balances } = this.props
    const data = TokenSelectConnected.selectCorrectBalance(balances)
    this.props.onTokenReceive(data)

    return <TokenSelect loading={fetching} data={data} />
  }
}

export default connect(
  getForTokenSelect,
  { onMount: fetchBalance }
)(TokenSelectConnected)
