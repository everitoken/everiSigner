import * as React from 'react'
import { Avatar, withStyles, Typography } from '@material-ui/core'
import { NetworkItemType } from '../../types'

type PropTypes = {
  network: NetworkItemType
  simple?: boolean
}

const CustomAvatar = withStyles({
  root: {
    width: '35px',
    height: '35px',
    fontSize: '0.5rem',
  },
})(Avatar)

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
        <div style={{ paddingRight: '10px' }}>
          <CustomAvatar aria-label="network">{network.abbr}</CustomAvatar>
        </div>
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
