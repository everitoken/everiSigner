import * as React from 'react'
import WithAuthentication from './WithAuthentication'
import InvalidRoute from './InvalidRoute'

import { NavigationLayout } from '../presentational/MainLayout'
import { ConnectedNavigationBackButton } from './NavigationButtons'
import { AccountStateType } from '../../store/reducer/accounts'
import { getAccountDetailScreen } from '../../store/getter'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import labels from '../../labels'
import AccountBalance from '../layout/ConnectedBalanceTable'
import { IconButton } from '@material-ui/core'
import RefreshIcon from '@material-ui/icons/Refresh'
import { fetchBalance } from '../action'

const RefreshButton = (props: { onRefresh: () => void }) => (
  <IconButton onClick={props.onRefresh}>
    <RefreshIcon fontSize="large" />
  </IconButton>
)

type AccountBalancePropTypes = {
  account: AccountStateType | undefined
  onRefresh: typeof fetchBalance
}

type AccountBalanceStateTypes = {}

class AccountBalanceScreen extends React.PureComponent<
  AccountBalancePropTypes & RouteComponentProps<{ id: string }>,
  AccountBalanceStateTypes
> {
  handleRefresh = () => {
    if (this.props.account) {
      this.props.onRefresh(this.props.account.publicKey)
    }
  }
  render() {
    return (
      <NavigationLayout
        title={labels.FUNGIBLE_BALANCE}
        renderLeft={() => <ConnectedNavigationBackButton />}
        renderRight={() => <RefreshButton onRefresh={this.handleRefresh} />}
      >
        {this.props.account ? (
          <div style={{ flex: '1 1 auto', padding: 16 }}>
            <AccountBalance publicKey={this.props.account.publicKey} showLink />
          </div>
        ) : null}
      </NavigationLayout>
    )
  }
}

const ConnectedAccountQR = connect(
  getAccountDetailScreen,
  { onRefresh: fetchBalance }
)(AccountBalanceScreen)

export default (props: RouteComponentProps<{ id: string }>) => (
  <WithAuthentication>
    {({ status }) => {
      if (status === 'password') {
        return <ConnectedAccountQR {...props} />
      }

      return (
        <InvalidRoute message="everiSigner needs to be unlock in order to show account list." />
      )
    }}
  </WithAuthentication>
)
