import * as React from 'react'
import { Typography } from '@material-ui/core'
import { NetworkItemType } from '../../types'

type PropTypes = {
  network: NetworkItemType
  compact?: boolean
  renderAction?: () => React.ReactNode
}

export default class NetworkListItem extends React.PureComponent<PropTypes> {
  static defaultProps = { simple: false }
  render() {
    const { network, compact, renderAction } = this.props
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
          <span>{`${network.location} (${network.name})`}</span>
          <Typography variant="caption">{network.url}</Typography>
        </div>
        {renderAction ? renderAction() : null}
      </div>
    )
  }
}
