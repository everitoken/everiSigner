import * as React from 'react'
import { AccountStateType } from '../../store/reducer/accounts'
import FlexContainer from '../presentational/FlexContainer'
import styled from 'styled-components'
import { shortenAddress } from '../util'

type PropTypes = {
  account: AccountStateType
  onClick: (account: AccountStateType) => void
}

const AccountName = styled.div`
  font-size: 15px;
  font-family: 'Roboto Mono';
`
const Address = styled.div`
  font-size: 11px;
  font-family: 'Roboto Mono';
`
const Container = styled.div`
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
  &:hover {
    background: #ececec;
  }
`

function AccountAvatar(props: PropTypes) {
  const address = props.account.publicKey
  return (
    <FlexContainer>
      <Container onClick={() => props.onClick(props.account)}>
        <AccountName>{props.account.name}</AccountName>
        <Address>{shortenAddress(address)}</Address>
      </Container>
    </FlexContainer>
  )
}

export default AccountAvatar
