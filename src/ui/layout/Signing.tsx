import * as React from 'react'
import { connect } from 'react-redux'
import { getSigningPayload } from '../../store/getter'
import { SigningPayloadStateType } from '../../store/reducer/signingPayload'
import { Button } from '@material-ui/core'
import FlexContainer from '../presentational/FlexContainer'
import { sign, SignType } from '../action'
import { ToBeSignDataType, MessageMetaType } from '../../types'

type PropTypes = {
  signingPayload: SigningPayloadStateType
  onClick: (raw: {
    payload: ToBeSignDataType
    meta?: MessageMetaType
  }) => SignType
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
// export default Signing

export default connect(
  getSigningPayload,
  { onClick: sign }
)(Signing)
