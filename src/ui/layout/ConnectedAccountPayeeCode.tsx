import * as React from 'react'
import { connect } from 'react-redux'
import { getMainAccount } from '../../store/getter'
import { AccountStateType } from '../../store/reducer/accounts'
import PayeeCode from '../presentational/PayeeCode'
import { NavigationLayout } from '../presentational/MainLayout'
import { ConnectedNavigationBackButton } from './NavigationButtons'
import labels from '../../labels'

type ConnectedProps = {
  account: AccountStateType
}

class ConnectedAccountPayeeCode extends React.Component<ConnectedProps> {
  render() {
    return (
      <NavigationLayout
        title={labels.PAYEE_CODE}
        renderLeft={() => <ConnectedNavigationBackButton />}
      >
        <div style={{ margin: '0 auto' }}>
          <PayeeCode publicKey={this.props.account.publicKey} />
        </div>
      </NavigationLayout>
    )
  }
}

export default connect(getMainAccount)(ConnectedAccountPayeeCode)
