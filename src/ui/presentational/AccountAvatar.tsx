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
class AccountAvatar extends React.PureComponent<PropTypes> {
  render() {
    const address = this.props.account.publicKey
    return (
      <FlexContainer>
        <Container onClick={() => this.props.onClick(this.props.account)}>
          <AccountName>{this.props.account.name}</AccountName>
          <Address>{shortenAddress(address)}</Address>
        </Container>
      </FlexContainer>
    )
  }
}

export default AccountAvatar
