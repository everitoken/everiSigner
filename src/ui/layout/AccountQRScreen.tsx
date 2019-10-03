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
import { get } from 'lodash'
import styled from 'styled-components'
import QR from '../presentational/QR'

type AccountQRPropTypes = {
  account: AccountStateType | undefined
}

const Address = styled.span`
  font-family: 'Roboto Mono';
  font-size: 12px;
  padding-top: 16px;
`

function AccountQR(props: AccountQRPropTypes) {
  return (
    <NavigationLayout
      title={get(props.account, 'name', '')}
      renderLeft={() => <ConnectedNavigationBackButton />}
    >
      {props.account ? (
        <FlexContainer alignItems="center">
          <Address>{props.account.publicKey}</Address>
          <QR data={props.account.publicKey} />
        </FlexContainer>
      ) : null}
    </NavigationLayout>
  )
}

const ConnectedAccountQR = connect(getAccountDetailScreen)(AccountQR)

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
