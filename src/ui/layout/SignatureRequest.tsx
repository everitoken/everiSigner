import * as React from 'react'
import { connect } from 'react-redux'
import { getSigningPayload } from '../../store/getter'
import { SigningPayloadStateType } from '../../store/reducer/signingPayload'
import { sign } from '../action'
import { getDisplayableSigningPayload } from '../util'
import { get } from 'lodash'
import AuthenticationProtectedView from './AuthenticationProtectedView'
import PopupLayout from '../presentational/PopupLayout'
import labels from '../../labels'
import BottomButtonGroup from '../presentational/BottomButtonGroup'

type PropTypes = {
  signingPayload: SigningPayloadStateType
  onClick: typeof sign
}

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
        <pre>
          {JSON.stringify(
            getDisplayableSigningPayload(signingPayload),
            null,
            4
          )}
        </pre>
        <span />
        <p style={{ overflowWrap: 'break-word' }}>
          Signed: {get(signingPayload, 'signed.payload.signature', null)}
        </p>
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
