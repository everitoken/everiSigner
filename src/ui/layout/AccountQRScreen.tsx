import * as React from 'react'
import WithAuthentication from './WithAuthentication'
import InvalidRoute from './InvalidRoute'

import FlexContainer from '../presentational/FlexContainer'
import { NavigationLayout } from '../presentational/MainLayout'
import { ConnectedNavigationBackButton } from './NavigationButtons'
import { AccountStateType } from '../../store/reducer/accounts'
import { getAccountDetailScreen } from '../../store/getter'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import * as qrcode from 'qrcode'
import { get } from 'lodash'
import styled from 'styled-components'

type AccountQRPropTypes = {
  account: AccountStateType | undefined
}

const Address = styled.span`
  font-family: 'Roboto Mono';
  font-size: 12px;
  padding-top: 16px;
`
type AccountQRStateTypes = { qr: null | string }

class AccountQR extends React.PureComponent<
  AccountQRPropTypes,
  AccountQRStateTypes
> {
  state = {
    qr: '',
  }

  componentWillMount() {
    if (this.props.account) {
      const { publicKey } = this.props.account

      qrcode
        .toDataURL(publicKey, {
          width: 500,
        })
        .then((qr: string) => this.setState({ qr }))
    }
  }
  render() {
    return (
      <NavigationLayout
        title={get(this.props.account, 'name', '')}
        renderLeft={() => <ConnectedNavigationBackButton />}
      >
        {this.props.account ? (
          <FlexContainer alignItems="center">
            <Address>{this.props.account.publicKey}</Address>
            {this.state.qr ? <img src={this.state.qr} width="100%" /> : null}
          </FlexContainer>
        ) : null}
      </NavigationLayout>
    )
  }
}

const ConnectedAccountQR = connect(getAccountDetailScreen)(AccountQR)

export default (props: RouteComponentProps) => (
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
