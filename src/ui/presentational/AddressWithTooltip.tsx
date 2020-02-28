import * as React from 'react'
import { Tooltip, Typography } from '@material-ui/core'
import MonospaceText from './MonospaceText'

type PropTypes = {
  text: string
  len?: number
}

export default function TruncateTextWithTooptip(props: PropTypes) {
  const { text, len = 7 } = props

  return (
    <Tooltip enterDelay={800} title={text}>
      <Typography component="span" variant="caption">
        <MonospaceText>
          {`${text.slice(0, len)}...${text.slice(-len)}`}
        </MonospaceText>
      </Typography>
    </Tooltip>
  )
}
