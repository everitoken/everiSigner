import * as React from 'react'
import { connect } from 'react-redux'
import { getSigningPayload } from '../../store/getter'
import { SigningPayloadStateType } from '../../store/reducer/signingPayload'
import { sign } from '../action'
import { getDisplayableSigningPayload } from '../util'
import AuthenticationProtectedView from './AuthenticationProtectedView'
import PopupLayout from '../presentational/PopupLayout'
import labels from '../../labels'
import BottomButtonGroup from '../presentational/BottomButtonGroup'
import ActionPanel from '../presentational/ActionPanel'
import FlexContainer from '../presentational/FlexContainer'
import Divider from '../presentational/Divider'
import styled from 'styled-components'
import KeyIcon from '@material-ui/icons/VpnKey'

type PropTypes = {
  signingPayload: SigningPayloadStateType
  onClick: typeof sign
}

const BottomContainers = styled.div`
  height: 55%;
  padding: 2px;
  margin-top: 8px;
`
class SignatureRequest extends React.PureComponent<PropTypes> {
  handleClick = () => {
    const { onClick, signingPayload } = this.props

    if (signingPayload.raw) {
      onClick(signingPayload.raw)
    }
  }

  handleCancel = () => {}

  render() {
    const { signingPayload } = this.props
    const data = getDisplayableSigningPayload(signingPayload)
    const actions = data.payload.actions

    const canSign =
      signingPayload.raw != null &&
      signingPayload.raw.payload &&
      signingPayload.signed === null

    return (
      <PopupLayout
        title={labels.REQUEST_SIGNATURE}
        bottomButtonGroup={
          <BottomButtonGroup
            onPrimaryButtonClick={this.handleClick}
            onSecondaryButtonClick={this.handleCancel}
            primaryButtonText={labels.SIGN}
            secondaryButtonText={labels.CANCEL_BUTTON_TEXT}
          />
        }
      >
        <FlexContainer alignItems="space-between" justifyContent="center">
          <FlexContainer>
            <p>some test</p>
          </FlexContainer>
          <BottomContainers>
            <FlexContainer
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <KeyIcon />
              <p style={{ paddingLeft: '6px', margin: 0, textAlign: 'center' }}>
                You are currently signing
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
