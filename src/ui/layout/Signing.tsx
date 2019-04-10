import * as React from 'react'
import { connect } from 'react-redux'
import { getSigningPayload } from '../../store/getter'
import { SigningPayloadStateType } from '../../store/reducer/signingPayload'
import { Button, Typography } from '@material-ui/core'
import FlexContainer from '../presentational/FlexContainer'
import { sign } from '../action'
import AuthProtectedView from './AuthProtectedView'
import Logo from '../presentational/Logo'
import LogIn from './LogIn'

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
        <p>{canSign}</p>
        <p>Raw: {JSON.stringify(signingPayload.raw)}</p>
        <p>Signed: {JSON.stringify(signingPayload.signed)}</p>
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

const AccountSetupReminder = () => (
  <FlexContainer withPadding>
    <Logo />
    <Typography variant="body1" color="textSecondary">
      EveriSigner is not yet set up yet. There is no account configured yet.
      Please go to the everiToken extension page and finish the set up process.
    </Typography>
  </FlexContainer>
)

export default () => (
  <AuthProtectedView>
    {({ status }) => {
      if (status === 'unknown') {
        return <AccountSetupReminder />
      }

      if (status === 'hash') {
        return (
          <FlexContainer withPadding>
            <LogIn message="Unlock to continue" />
          </FlexContainer>
        )
      }

      return <ConnectedSigningScreen />
    }}
  </AuthProtectedView>
)
