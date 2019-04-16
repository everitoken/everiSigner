import * as React from 'react'
import { ActionNameSupportedTypes } from '../../types'
import { Tooltip, Fade } from '@material-ui/core'
import MonospaceText from './MonospaceText'
import InlineButton from './InlineButton'

type PropTypes = {
  name: ActionNameSupportedTypes
}

export const ActionDescription: {
  [key in ActionNameSupportedTypes]: string
} = {
  transferft: 'Transfer fungible',
}

class SiteLocation extends React.PureComponent<PropTypes> {
  render() {
    return (
      <Tooltip
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 600 }}
        disableFocusListener
        title={ActionDescription[this.props.name]}
      >
        <InlineButton disableTouchRipple component="span">
          <MonospaceText>{this.props.name}</MonospaceText>
        </InlineButton>
      </Tooltip>
    )
  }
}

export default SiteLocation
