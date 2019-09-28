import * as React from 'react'
import { NetworkItemType } from '../../types'
import * as style from '../../style'
import {
  Chip,
  Dialog,
  IconButton,
  Divider,
  DialogContent,
  List,
  ListItem,
  Radio,
  withStyles,
  StyledComponentProps,
} from '@material-ui/core'
import ExpandMore from '@material-ui/icons/ExpandMore'
import CloseIcon from '@material-ui/icons/Close'
import NetworkListItem from './NetworkListItem'
import { isSameNetwork } from '../util'
import labels from '../../labels'
import { APP_BAR_HEIGHT } from '../../style'
import { HeaderTitle } from './MainLayout'

type PropTypes = {
  selected: NetworkItemType
  networks: NetworkItemType[]
  onSelect: any // TODO
}

type StateTypes = {
  selected: NetworkItemType
  open: boolean
}

const styles = {
  root: {
    color: style.colors.headerPrimary,
    borderColor: '#ccc',
  },
}
class NetworkSelect extends React.PureComponent<
  PropTypes & StyledComponentProps,
  StateTypes
> {
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
    if (!isSameNetwork(this.state.selected, network)) {
      this.props.onSelect(network)
    }
  }

  renderSelectNetwork = () => {
    if (!this.state.open) {
      return null
    }

    return (
      <Dialog fullScreen open={this.state.open}>
        <div
          style={{
            padding: `0 ${style.padding.standard}px`,
            height: APP_BAR_HEIGHT,
            display: 'flex',
            alignContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <HeaderTitle title={labels.NETWORK_SELECT} />
          <IconButton onClick={this.handleClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <Divider />
        <DialogContent>
          <List>
            {this.props.networks.map(network => (
              <ListItem
                key={network.url}
                role={undefined}
                dense
                disableGutters
                button
                onClick={() => this.handleSelect(network)}
              >
                <Radio
                  checked={isSameNetwork(network, this.state.selected)}
                  tabIndex={-1}
                  value={network.name}
                  name="select-network"
                />
                <NetworkListItem network={network} compact />
              </ListItem>
            ))}
          </List>
        </DialogContent>
      </Dialog>
    )
  }

  render() {
    const { classes } = this.props
    return (
      <React.Fragment>
        <div />
        {this.renderSelectNetwork()}
        <Chip
          className={classes && classes.root}
          label={
            <p
              className="everitoken-mono"
              style={{ fontSize: '12px', color: style.colors.headerPrimary }}
            >
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

export default withStyles(styles)(NetworkSelect)
