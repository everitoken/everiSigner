import * as React from 'react'
import { connect } from 'react-redux'
import { getSigningPayload } from '../../store/getter'
import { SigningPayloadStateType } from '../../store/reducer/signingPayload'
import { Button, Typography, CircularProgress } from '@material-ui/core'
import FlexContainer from '../presentational/FlexContainer'
import { sign } from '../action'
import { getDisplayableSigningPayload } from '../util'
import { get } from 'lodash'
import AuthenticationProtectedView from './AuthenticationProtectedView'

type PropTypes = {
  signingPayload: SigningPayloadStateType
  onClick: typeof sign
}

class Signing extends React.PureComponent<PropTypes> {
  handleClick = () => {
    const { onClick, signingPayload } = this.props

    if (signingPayload.raw) {
      onClick(signingPayload.raw)
    }
  }

  render() {
    const { signingPayload } = this.props

    const canSign =
      signingPayload.raw != null &&
      signingPayload.raw.payload &&
      signingPayload.signed === null

    return (
      <FlexContainer withPadding justifyContent="space-between">
        <div>
          <Typography variant="h4">Signing Request</Typography>
          <Typography variant="body2">
            Overview of data to be signed.
          </Typography>
        </div>
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
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={this.handleClick}
        >
          Sign
        </Button>
      </FlexContainer>
    )
  }
}

const ConnectedSigningScreen = connect(
  getSigningPayload,
  { onClick: sign }
)(Signing)

export default () => (
  <AuthenticationProtectedView>
    <ConnectedSigningScreen />
  </AuthenticationProtectedView>
)
