import * as React from 'react'
import WithAuthentication from './WithAuthentication'
import InvalidRoute from './InvalidRoute'

import FlexContainer from '../presentational/FlexContainer'
import { NavigationLayout } from '../presentational/MainLayout'
import ConnectedNavigationBackButton from './NavigationButtons'
import { getAccountById } from '../../store/getter'
import { useSelector } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import { get } from 'lodash'
import styled from 'styled-components'
import QR from '../presentational/QR'
import { AppState } from '../../store/reducer'

const Address = styled.span`
  font-family: 'Roboto Mono';
  font-size: 12px;
  padding-top: 16px;
`

function AccountQR(props: RouteComponentProps<{ id: string }>) {
  const account = useSelector((state: AppState) =>
    getAccountById(state, { id: props.match.params.id })
  )

  return (
    <NavigationLayout
      title={get(account, 'name', '')}
      renderLeft={() => <ConnectedNavigationBackButton />}
    >
      {account ? (
        <FlexContainer alignItems="center">
          <Address>{account.publicKey}</Address>
          <QR data={account.publicKey} />
        </FlexContainer>
      ) : null}
    </NavigationLayout>
  )
}

export default (props: RouteComponentProps<{ id: string }>) => (
  <WithAuthentication>
    {({ status }) => {
      if (status === 'password') {
        return <AccountQR {...props} />
      }

      return (
        <InvalidRoute message="everiSigner needs to be unlock in order to show account list." />
      )
    }}
  </WithAuthentication>
)
