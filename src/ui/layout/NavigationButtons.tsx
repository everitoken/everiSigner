import * as React from 'react'

import BackIcon from '@material-ui/icons/ArrowBack'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { IconButton } from '@material-ui/core'
import * as H from 'history'

type PropTypes = {
  onClick?: (history: H.History) => void
}

class NavigationBackButton extends React.PureComponent<
  PropTypes & RouteComponentProps
> {
  handleClick = () => {
    if (this.props.onClick) {
      this.props.onClick(this.props.history)
    } else {
      this.props.history.goBack()
    }
  }
  render() {
    return (
      <IconButton onClick={this.handleClick}>
        <BackIcon fontSize="large" />
      </IconButton>
    )
  }
}

export const ConnectedNavigationBackButton = withRouter(NavigationBackButton)
