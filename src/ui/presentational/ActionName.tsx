import * as React from 'react'
import { ActionNameSupportedTypes } from '../../types'
import { Tooltip, Fade, Button, withStyles } from '@material-ui/core'
import MonospaceText from './MonospaceText'

type PropTypes = {
  name: ActionNameSupportedTypes
}

const StyledButton = withStyles({
  root: {
    padding: '2px 3px',
  },
  text: {
    textTransform: 'none',
  },
})(Button)

export const ActionDescription: {
  [key in ActionNameSupportedTypes]: string
} = {
  transferft: 'Transfer fungible',
}

class ActionName extends React.PureComponent<PropTypes> {
  render() {
    return (
      <Tooltip
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 600 }}
        disableFocusListener
        title={ActionDescription[this.props.name]}
      >
        <StyledButton disableTouchRipple component="span">
          <MonospaceText>{this.props.name}</MonospaceText>
        </StyledButton>
      </Tooltip>
    )
  }
}

export default ActionName
