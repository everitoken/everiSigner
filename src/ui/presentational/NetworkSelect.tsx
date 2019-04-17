import * as React from 'react'
import { NetworkItemType } from '../../types'
import {
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  Checkbox,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Radio,
} from '@material-ui/core'
import CloudIcon from '@material-ui/icons/Cloud'
import ExpandMore from '@material-ui/icons/ExpandMore'
import CommentIcon from '@material-ui/icons/CommentOutlined'
import NetworkListItem from './NetworkListItem'

type PropTypes = {
  selected: NetworkItemType
  networks: NetworkItemType[]
  onSelect: any
}

type StateTypes = {
  selected: NetworkItemType
  open: boolean
}

export default class NetworkSelect extends React.PureComponent<
  PropTypes,
  StateTypes
> {
  static defaultProps = { simple: false }
  state = {
    selected: this.props.selected,
    open: false,
  }
  handleOpen = () => {
    this.setState({ open: true })
  }
  handleClose = () => {
    this.setState({ open: false })
  }
  handleSelect = (network: NetworkItemType) => {
    this.setState({ selected: network, open: false })
    if (this.state.selected.name !== network.name) {
      this.props.onSelect(network)
    }
  }

  renderSelectNetwork = () => {
    if (!this.state.open) {
      return null
    }

    return (
      <Dialog
        disableBackdropClick
        open={this.state.open}
        onClose={this.handleClose}
      >
        <DialogTitle>Select network</DialogTitle>
        <DialogContent>
          <List>
            {this.props.networks.map(network => (
              <ListItem
                key={network.name}
                role={undefined}
                dense
                button
                onClick={() => this.handleSelect(network)}
              >
                <Radio
                  checked={network.name === this.state.selected.name}
                  tabIndex={-1}
                  value={network.name}
                  name="select-network"
                />
                <NetworkListItem network={network} />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

  render() {
    return (
      <React.Fragment>
        {this.renderSelectNetwork()}
        <Chip
          icon={<CloudIcon />}
          label={
            <p style={{ fontFamily: 'Roboto Mono' }}>
              <b>Network: </b>
              {this.state.selected.location.toUpperCase()}
            </p>
          }
          deleteIcon={<ExpandMore />}
          onDelete={this.handleOpen}
          variant="outlined"
          color="primary"
        />
      </React.Fragment>
    )
  }
}
