import * as React from 'react'
import { Typography } from '@material-ui/core'
import { NetworkItemType } from '../../types'

type PropTypes = {
  network: NetworkItemType
  simple?: boolean
}

export default class NetworkListItem extends React.PureComponent<PropTypes> {
  static defaultProps = { simple: false }
  render() {
    const { network, simple } = this.props
    return (
      <div
        className="everitoken-mono"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div>
          <span>{`${network.location} (${network.name})`}</span>
          {!simple ? (
            <Typography variant="caption">{network.url}</Typography>
          ) : null}
        </div>
      </div>
    )
  }
}
