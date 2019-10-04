import * as React from 'react'

import BackIcon from '@material-ui/icons/ArrowBack'
import { IconButton } from '@material-ui/core'
import * as H from 'history'
import { useHistory } from 'react-router'

type PropTypes = {
  onClick?: (history: H.History) => void
}
export default function NavigationBackButton(props: PropTypes) {
  const history = useHistory()
  const handleClick = () => {
    if (props.onClick) {
      props.onClick(history)
    } else {
      history.goBack()
    }
  }

  return (
    <IconButton onClick={handleClick}>
      <BackIcon fontSize="large" />
    </IconButton>
  )
}
