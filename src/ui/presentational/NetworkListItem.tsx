import * as React from 'react'
import { CardHeader, Avatar, withStyles, Typography } from '@material-ui/core'
import { NetworkItemType } from '../../types'

type PropTypes = {
  network: NetworkItemType
  simple?: boolean
}

const CustomCardHeader = withStyles({
  root: {
    padding: '2px 5px',
  },
  title: {
    fontSize: '14px',
    fontWeight: 'bold',
    padding: '2px',
    lineHeight: '1rem',
  },
  subheader: {
    padding: '2px',
    lineHeight: '1rem',
  },
})(CardHeader)

const CustomAvatar = withStyles({
  root: {
    width: '35px',
    height: '35px',
    fontSize: '0.7rem',
  },
})(Avatar)

export default class NetworkListItem extends React.PureComponent<PropTypes> {
  static defaultProps = { simple: false }
  render() {
    const { network, simple } = this.props
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          fontFamily: 'Roboto Mono',
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
