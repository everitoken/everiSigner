import * as React from 'react'
import { Tooltip, Fade } from '@material-ui/core'
import MonospaceText from './MonospaceText'
import MessageIcon from '@material-ui/icons/Message'
import InlineButton from './InlineButton'

type PropTypes = {
  message: string
}

class SigningMessage extends React.PureComponent<PropTypes> {
  render() {
    return (
      <Tooltip
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 600 }}
        disableFocusListener
        title="Message of the signing request"
      >
        <InlineButton disableTouchRipple component="span">
          <MessageIcon />
          <MonospaceText>{this.props.message.slice(0, 100)}</MonospaceText>
        </InlineButton>
      </Tooltip>
    )
  }
}

export default SigningMessage
