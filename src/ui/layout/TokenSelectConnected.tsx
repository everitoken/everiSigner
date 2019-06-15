import * as React from 'react'
import { connect } from 'react-redux'
import { getForTokenSelect } from '../../store/getter'
import { fetchBalance } from '../action'
import TokenSelect from '../presentational/TokenSelect'
import { TokenDetail } from '../../types'
import { getEmptyEvtBalance } from '../util'
import { Dialog, IconButton, Divider, DialogContent } from '@material-ui/core'
import { APP_BAR_HEIGHT } from '../../style'
import { HeaderTitle } from '../presentational/MainLayout'
import labels from '../../labels'
import TokenBalanceSelectList from '../presentational/TokenBalanceSelectList'
import CloseIcon from '@material-ui/icons/Close'
import * as style from '../../style'

type OwnProps = {
  onTokenReceive: (token: TokenDetail) => void
}

type PropTypes = {
  publicKey: string
  fetching: boolean
  balances: TokenDetail[]
  onMount: typeof fetchBalance
}

type StateProps = {
  open: boolean
  selected: TokenDetail
}

class TokenSelectConnected extends React.PureComponent<
  PropTypes & OwnProps,
  StateProps
> {
  // Smart select which balance who display, e.g. priority Evt over others
  constructor(props: PropTypes & OwnProps) {
    super(props)

    this.state = {
      open: false,
      selected: TokenSelectConnected.selectCorrectBalance(this.props.balances),
    }
  }

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

  componentDidMount() {
    this.props.onMount(this.props.publicKey, 'transferft')
  }

  componentWillReceiveProps(nextProps: PropTypes) {
    if (nextProps.publicKey !== this.props.publicKey) {
      nextProps.onMount(nextProps.publicKey, 'transferft')
    }
  }

  handleOpenSelection = () => {
    this.setState({ open: true })
  }

  handleCloseSelection = () => {
    this.setState({ open: false })
  }

  handleSelection = (selected: TokenDetail) => {
    this.setState({ selected })
  }

  render() {
    const { fetching } = this.props

    this.props.onTokenReceive(this.state.selected)

    return (
      <React.Fragment>
        <Dialog
          fullScreen
          open={this.state.open}
          onClose={this.handleCloseSelection}
        >
          <div
            style={{
              padding: `0 ${style.padding.standard}px`,
              height: APP_BAR_HEIGHT,
              display: 'flex',
              alignContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <HeaderTitle title={labels.ACCOUNT_SELECT} />
            <IconButton onClick={this.handleCloseSelection}>
              <CloseIcon />
            </IconButton>
          </div>
          <Divider />
          <DialogContent>
            <TokenBalanceSelectList
              balances={this.props.balances}
              selected={this.state.selected}
              onSelect={this.handleSelection}
            />
          </DialogContent>
        </Dialog>
        <TokenSelect
          loading={fetching}
          data={this.state.selected}
          onClick={this.handleOpenSelection}
        />
      </React.Fragment>
    )
  }
}

export default connect(
  getForTokenSelect('transferft'),
  { onMount: fetchBalance }
)(TokenSelectConnected)
