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

type AccountBalancePropTypes = {
  account: AccountStateType | undefined
}

type AccountBalanceStateTypes = {}

class AccountBalanceScreen extends React.PureComponent<
  AccountBalancePropTypes & RouteComponentProps<{ id: string }>,
  AccountBalanceStateTypes
> {
  render() {
    return (
      <NavigationLayout
        title={labels.BALANCE}
        renderLeft={() => <ConnectedNavigationBackButton />}
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

const ConnectedAccountQR = connect(getAccountDetailScreen)(AccountBalanceScreen)

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
