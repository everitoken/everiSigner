import * as React from 'react'
import { NavigationLayout } from '../presentational/MainLayout'
import { ConnectedNavigationBackButton } from './NavigationButtons'
import labels from '../../labels'
import { NetworkStateType } from '../../store/reducer/network'
import { RouteComponentProps, Route, withRouter } from 'react-router-dom'
import { getNetworks } from '../../store/getter'
import { connect } from 'react-redux'
import { compose } from 'redux'
import MoreIcon from '@material-ui/icons/MoreVert'
import {
  List,
  ListItem,
  Badge,
  ListItemSecondaryAction,
  IconButton,
  Menu,
  MenuItem,
} from '@material-ui/core'
import NetworkListItem from '../presentational/NetworkListItem'
import { NetworkItemType } from '../../types'
import { networkSelect } from '../../store/action'

const ITEM_HEIGHT = 40

type NetworkItemMoreMenuPropTypes = {
  anchorEl: any
  network: NetworkItemType
  isSelected: boolean
  onClose: () => void
  onSelectNetwork: typeof networkSelect
}

class NetworkItemMoreMenu extends React.Component<
  NetworkItemMoreMenuPropTypes
> {
  state = { network: this.props.network }
  handleClose = () => {
    this.props.onClose()
  }

  render() {
    const { anchorEl } = this.props
    const open = Boolean(anchorEl)

    return (
      <Menu
        disableAutoFocusItem
        anchorEl={anchorEl}
        open={open}
        onClose={this.handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: 200,
          },
        }}
      >
        <MenuItem
          disabled={this.props.isSelected}
          onClick={() => {
            this.props.onSelectNetwork(this.state.network)
            this.handleClose()
          }}
        >
          {labels.SET_NETWORK_AS_DEFAULT}
        </MenuItem>

        <MenuItem
          disabled={!this.props.network.isCustom}
          onClick={() => {
            this.handleClose()
          }}
        >
          {labels.REMOVE_NETWORK}
        </MenuItem>
      </Menu>
    )
  }
}

type NetworkListPropTypes = NetworkStateType & {
  onNetworkSelect: typeof networkSelect
}

type NetworkListStateTypes = {
  anchorEl: any
  isSelected: boolean
  currentNetwork: NetworkItemType
}

class NetworkList extends React.PureComponent<
  NetworkListPropTypes,
  NetworkListStateTypes
> {
  state = {
    anchorEl: null,
    isSelected: false,
    currentNetwork: this.props.selected,
  }
  handleMoreClick = (event: any, currentNetwork: NetworkItemType) => {
    this.setState({
      anchorEl: event.currentTarget,
      currentNetwork,
      isSelected: currentNetwork.name === this.props.selected.name,
    })
  }

  render() {
    return (
      <div style={{ flex: '1 1 auto', height: '476px', overflow: 'scroll' }}>
        <List>
          <NetworkItemMoreMenu
            isSelected={this.state.isSelected}
            network={this.state.currentNetwork}
            anchorEl={this.state.anchorEl}
            onClose={() => this.setState({ anchorEl: null })}
            onSelectNetwork={() =>
              this.props.onNetworkSelect(this.state.currentNetwork)
            }
          />
          {this.props.networks.map(network => (
            <ListItem key={network.name} role={undefined} button>
              <Badge
                variant="dot"
                color="secondary"
                invisible={this.props.selected.name !== network.name}
              >
                <NetworkListItem network={network} />
              </Badge>
              <ListItemSecondaryAction>
                <IconButton
                  aria-label="More"
                  onClick={event => this.handleMoreClick(event, network)}
                >
                  <MoreIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </div>
    )
  }
}

const ConnectedNetworkList = compose(
  withRouter,
  connect(
    getNetworks,
    { onNetworkSelect: networkSelect }
  )
)(NetworkList)

type NetworkCreatePropTypes = {}
class NetworkCreate extends React.PureComponent<NetworkCreatePropTypes> {
  render() {
    return <p>Network create</p>
  }
}

export default class extends React.PureComponent<RouteComponentProps> {
  render() {
    const { match } = this.props

    return (
      <NavigationLayout
        title={labels.NETWORK}
        renderLeft={() => <ConnectedNavigationBackButton />}
      >
        <Route path={`${match.path}/`} component={ConnectedNetworkList} />
        <Route path={`${match.path}/create`} component={NetworkCreate} />
      </NavigationLayout>
    )
  }
}
