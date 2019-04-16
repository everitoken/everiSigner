import * as React from 'react'
import { Fade, Chip, Link } from '@material-ui/core'
import MapIcon from '@material-ui/icons/Map'
import Tooltip from './Tooltip'

type PropTypes = {
  address: string
  type: 'from' | 'to' | 'address' | 'payer'
}

class Address extends React.PureComponent<PropTypes> {
  render() {
    return (
      <Tooltip
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 600 }}
        disableHoverListener
        interactive
        title={
          <React.Fragment>
            View this address on{' '}
            <Link
              target="_blank"
              color="secondary"
              href={`https://evtscan.io/address/${this.props.address}`}
            >
              evtscan.io
            </Link>
          </React.Fragment>
        }
      >
        <Chip
          variant="outlined"
          icon={<MapIcon />}
          label={
            <p>
              <b>{this.props.type.toLocaleUpperCase()}: </b>
              {this.props.address}
            </p>
          }
          color="primary"
        />
      </Tooltip>
    )
  }
}

export default Address
