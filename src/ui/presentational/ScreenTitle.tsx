import * as React from 'react'
import { Typography } from '@material-ui/core'

type PropTypes = {
  children: React.ReactNode
}
export default class ScreenTitle extends React.PureComponent<PropTypes> {
  render() {
    return <Typography variant="h6">{this.props.children}</Typography>
  }
}
