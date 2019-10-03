import * as React from 'react'
import { Typography } from '@material-ui/core'

type PropTypes = {
  children: React.ReactNode
}

export default function ScreenTitle(props: PropTypes) {
  return <Typography variant="h6">{props.children}</Typography>
}
