import * as React from 'react'
import { Divider } from '@material-ui/core'

type PropTypes = {
  margin?: string
}

export default (props: PropTypes = { margin: '0' }) => (
  <Divider
    variant="fullWidth"
    style={{ width: '100%', margin: props.margin }}
  />
)
