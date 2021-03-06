import * as React from 'react'
import { Typography } from '@material-ui/core'
import { NetworkItemType } from '../../types'

type PropTypes = {
  network: NetworkItemType
  compact?: boolean
  renderAction?: () => React.ReactNode
}

export default function NetworkListItem(props: PropTypes) {
  const { network, compact, renderAction } = props

  return (
    <div
      className="everitoken-mono"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div style={compact ? {} : { fontSize: '14px' }}>
        <Typography variant="inherit" component="p">
          {network.location}
        </Typography>
        <Typography variant="caption">{network.url}</Typography>
      </div>
      {renderAction ? renderAction() : null}
    </div>
  )
}
