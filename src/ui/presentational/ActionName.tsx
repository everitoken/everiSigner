import * as React from 'react'
import { ActionNameSupportedTypes } from '../../types'
import { Fade, Chip } from '@material-ui/core'
import Fiber from '@material-ui/icons/FiberSmartRecord'
import Tooltip from './Tooltip'

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
        title={this.props.name}
      >
        <Chip
          icon={<Fiber />}
          style={{
            paddingRight: 0,
            fontFamily: 'Roboto Mono',
            fontSize: '12px',
          }}
          label={ActionDescription[this.props.name]}
        />
      </Tooltip>
    )
  }
}

export default SiteLocation
