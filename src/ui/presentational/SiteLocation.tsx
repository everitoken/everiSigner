import * as React from 'react'
import { Tooltip, Fade } from '@material-ui/core'
import MonospaceText from './MonospaceText'
import WebIcon from '@material-ui/icons/Web'
import InlineButton from './InlineButton'

type PropTypes = {
  url: string
}

class ActionName extends React.PureComponent<PropTypes> {
  render() {
    return (
      <Tooltip
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 600 }}
        disableFocusListener
        title="Website which requests signing"
      >
        <InlineButton disableTouchRipple component="span">
          <WebIcon />
          <MonospaceText>{this.props.url}</MonospaceText>
        </InlineButton>
      </Tooltip>
    )
  }
}

export default ActionName
