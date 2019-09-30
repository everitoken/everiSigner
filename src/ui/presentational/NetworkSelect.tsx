import * as React from 'react'
import { NetworkItemType } from '../../types'
import * as style from '../../style'
import { Chip, withStyles, StyledComponentProps } from '@material-ui/core'
import ExpandMore from '@material-ui/icons/ExpandMore'
import { isSameNetwork } from '../util'
import NetworkSelectionDialog from './NetworkSelectionDialog'
import { NetworkContext } from '../../context/Network'

const styles = {
  root: {
    color: style.colors.headerPrimary,
    borderColor: '#ccc',
  },
}

function NetworkSelect(props: StyledComponentProps) {
  const [open, setOpen] = React.useState(false)
  const { networks, selected, selectNetwork } = React.useContext(NetworkContext)

  const handleSelect = (network: NetworkItemType) => {
    console.log('FEI1', network)
    if (!isSameNetwork(selected, network)) {
      selectNetwork(network)
    }
    setOpen(false)
  }

  const handleClose = () => setOpen(false)

  const { classes } = props

  return (
    <React.Fragment>
      <NetworkSelectionDialog
        open={open}
        handleClose={handleClose}
        networks={networks}
        selected={selected}
        handleSelect={handleSelect}
      />
      <Chip
        className={classes && classes.root}
        label={
          <p
            className="everitoken-mono"
            style={{ fontSize: '12px', color: style.colors.headerPrimary }}
          >
            <b>Network: </b>
            {selected.location.toUpperCase()}
          </p>
        }
        deleteIcon={<ExpandMore />}
        onDelete={() => setOpen(true)}
        variant="outlined"
        color="primary"
      />
    </React.Fragment>
  )
}

export default withStyles(styles)(NetworkSelect)
