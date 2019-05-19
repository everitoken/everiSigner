import * as React from 'react'
import { connect } from 'react-redux'
import { getSigningPayload } from '../../store/getter'
import { SigningPayloadStateType } from '../../store/reducer/signingPayload'
import { sign } from '../action'
import { getDisplayableSigningPayload, shortenAddress } from '../util'
import AuthenticationProtectedView from './AuthenticationProtectedView'
import PopupLayout from '../presentational/PopupLayout'
import labels from '../../labels'
import BottomButtonGroup from '../presentational/BottomButtonGroup'
import ActionPanel from '../presentational/ActionPanel'
import FlexContainer from '../presentational/FlexContainer'
import Divider from '../presentational/Divider'
import styled from 'styled-components'
import KeyIcon from '@material-ui/icons/VpnKey'
import ConnectedEntities from '../presentational/ConnectedEntities'
import CircularEntity from '../presentational/CircularEntity'
import { AccountStateType } from '../../store/reducer/accounts'

type PropTypes = {
  signingPayload: SigningPayloadStateType
  onClick: typeof sign
  accounts: AccountStateType[]
  mainAccount: AccountStateType
}

const BottomContainers = styled.div`
  height: 65%;
  padding: 2px;
  margin-top: 8px;
`
class SignatureRequest extends React.PureComponent<PropTypes> {
  handleClick = (publicKey: string) => {
    const { onClick, signingPayload } = this.props

    if (signingPayload.raw) {
      onClick(signingPayload.raw, publicKey)
    }
  }

  handleCancel = () => {}

  render() {
    const { signingPayload, accounts, mainAccount } = this.props
    const data = getDisplayableSigningPayload(signingPayload)
    const { actions } = data.payload
    const {
      addresses,
      title,
      site,
    }: { addresses: string[]; title: string; site: string } = data

    const canSign =
      signingPayload.raw != null &&
      signingPayload.raw.payload &&
      signingPayload.signed === null

    const whitelistAccounts = !addresses.length
      ? accounts
      : accounts.filter(({ publicKey }) => addresses.includes(publicKey))

    const account = (whitelistAccounts[0] || mainAccount) as AccountStateType

    const left = <CircularEntity title={title} subtitle={site} />

    const right = (
      <CircularEntity
        title={account.name}
        subtitle={shortenAddress(account.publicKey)}
      />
    )

    return (
      <PopupLayout
        title={labels.REQUEST_SIGNATURE}
        bottomButtonGroup={
          <BottomButtonGroup
            onPrimaryButtonClick={() => this.handleClick(account.publicKey)}
            onSecondaryButtonClick={this.handleCancel}
            primaryButtonText={labels.SIGN}
            secondaryButtonText={labels.CANCEL_BUTTON_TEXT}
          />
        }
      >
        <FlexContainer justifyContent="center">
          <FlexContainer>
            <ConnectedEntities left={left} right={right} />
          </FlexContainer>
          <BottomContainers>
            <FlexContainer
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <KeyIcon />
              <p style={{ paddingLeft: '6px', margin: 0, textAlign: 'center' }}>
                {labels.CURRENTLY_SIGNING}
              </p>
            </FlexContainer>
            <div style={{ padding: '12px 0' }}>
              <Divider />
            </div>
            <div style={{ overflow: 'auto', height: '90%', padding: 2 }}>
              {actions.map((action, i) => (
                <ActionPanel key={i} action={action} />
              ))}
            </div>
          </BottomContainers>
        </FlexContainer>
      </PopupLayout>
    )
  }
}

const ConnectedSigningScreen = connect(
  getSigningPayload,
  { onClick: sign }
)(SignatureRequest)

export default () => (
  <AuthenticationProtectedView>
    <ConnectedSigningScreen />
  </AuthenticationProtectedView>
)
