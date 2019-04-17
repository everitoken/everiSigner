import * as React from 'react'
import { Card, CardHeader, Avatar, withStyles } from '@material-ui/core'

type NetworkType = {
  abbr: string
  name: string
  url: string
  location: string
}

type PropTypes = {
  network: NetworkType
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
    width: '30px',
    height: '30px',
    fontSize: '0.9rem',
  },
})(Avatar)

export default class NetworkListItem extends React.PureComponent<PropTypes> {
  static defaultProps = { simple: false }
  render() {
    const { network, simple } = this.props
    return (
      <Card>
        <CustomCardHeader
          avatar={
            <CustomAvatar aria-label="network">{network.abbr}</CustomAvatar>
          }
          title={`${network.location} (${network.name})`}
          subheader={simple ? network.url : ''}
        />
      </Card>
    )
  }
}
