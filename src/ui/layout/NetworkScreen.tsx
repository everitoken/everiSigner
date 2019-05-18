import * as React from 'react'
import { NavigationLayout } from '../presentational/MainLayout'
import { ConnectedNavigationBackButton } from './NavigationButtons'
import labels from '../../labels'
import { NetworkStateType } from '../../store/reducer/network'
import FlexContainer from '../presentational/FlexContainer'
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
  FormControl,
  InputLabel,
  Input,
  Divider,
} from '@material-ui/core'
import NetworkListItem from '../presentational/NetworkListItem'
import { NetworkItemType } from '../../types'
import { networkSelect } from '../../store/action'
import { isSameNetwork } from '../util'
import { addCustomNetwork, removeNetwork } from '../action'
import InfoArea from '../presentational/InfoArea'
import { isEmpty } from 'lodash'
import Button from '../presentational/InlineButton'
import parseUrl from 'parse-url'
import AddIconButton from '../presentational/AddIconButton'

const ITEM_HEIGHT = 40

type NetworkItemMoreMenuPropTypes = {
  anchorEl: any
  network: NetworkItemType
  isSelected: boolean
  onClose: () => void
  onSelectNetwork: typeof networkSelect
  onRemoveNetwork: typeof removeNetwork
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
            this.props.onRemoveNetwork(this.state.network)
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
  onNetworkRemove: typeof removeNetwork
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
      isSelected: isSameNetwork(currentNetwork, this.props.selected),
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
            onRemoveNetwork={() =>
              this.props.onNetworkRemove(this.state.currentNetwork)
            }
          />
          {this.props.networks.map((network, i) => (
            <React.Fragment>
              <ListItem key={network.url} role={undefined} button>
                <Badge
                  variant="dot"
                  color="secondary"
                  invisible={!isSameNetwork(this.props.selected, network)}
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

              {i !== this.props.networks.length - 1 ? (
                <Divider variant="fullWidth" />
              ) : null}
            </React.Fragment>
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
    { onNetworkSelect: networkSelect, onNetworkRemove: removeNetwork }
  )
)(NetworkList)

type NetworkCreatePropTypes = NetworkStateType & {
  networks: NetworkItemType[]
  onNetworkAdd: typeof addCustomNetwork
}

type NetworkCreateStateTypes = {
  url: string
  location: string
  errors: { url: boolean; location: boolean }
  errorMessage: string
}

class NetworkCreate extends React.PureComponent<
  NetworkCreatePropTypes & RouteComponentProps,
  NetworkCreateStateTypes
> {
  state = {
    urls: this.props.networks.map(({ url }) => url),
    url: '',
    location: '',
    errors: {
      url: false,
      location: false,
    },
    errorMessage: '',
  }

  handleFieldChange = (name: 'url' | 'location') => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    this.setState({
      [name]: event.target.value,
      errors: {
        ...this.state.errors,
        [name]: false,
      },
      errorMessage: '',
    })
  }

  validate = () => {
    // validate url, and location
    if (isEmpty(this.state.location) || this.state.location.length > 12) {
      this.setState({
        errors: {
          ...this.state.errors,
          location: true,
        },
        errorMessage: 'Invalid location name',
      })
      return false
    }

    let validUrl = true

    debugger
    try {
      parseUrl(this.state.url, true)
    } catch (e) {
      validUrl = false
    }

    if (isEmpty(this.state.url) || !validUrl) {
      this.setState({
        errors: {
          ...this.state.errors,
          url: true,
        },
        errorMessage: 'Not a valid url.',
      })

      return false
    }

    // validate url or location exist in list
    if (this.state.urls.includes(this.state.url)) {
      this.setState({
        errors: {
          ...this.state.errors,
          url: true,
        },
        errorMessage: 'This url exits already',
      })

      return false
    }

    return true
  }

  handleCreateNetwork = () => {
    if (this.validate()) {
      this.props.onNetworkAdd({
        url: this.state.url,
        name: 'custom',
        location: this.state.location,
        isProduction: false,
        isCustom: true,
      })
      setTimeout(() => {
        this.props.history.goBack()
      }, 300)
    }
  }

  render() {
    return (
      <FlexContainer justifyContent="space-between">
        <div style={{ width: '100%' }}>
          <InfoArea>
            <ul>
              <li>Create custom network</li>
              <li>Custom network can be deleted</li>
            </ul>
          </InfoArea>
          {!isEmpty(this.state.errorMessage) ? (
            <p
              style={{
                paddingLeft: '8px',
                color: 'red',
                fontFamily: 'Roboto Mono',
              }}
            >
              {this.state.errorMessage}
            </p>
          ) : null}
        </div>

        <FlexContainer withPadding justifyContent="space-around">
          <FormControl fullWidth>
            <InputLabel htmlFor="network-location">
              {labels.NETWORK_LOCATION}
            </InputLabel>
            <Input
              required
              error={this.state.errors.location}
              id="location"
              type="text"
              value={this.state.location}
              onChange={this.handleFieldChange('location')}
            />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel htmlFor="network-url">{labels.NETWORK_URL}</InputLabel>
            <Input
              required
              error={this.state.errors.url}
              id="url"
              type="text"
              value={this.state.url}
              onChange={this.handleFieldChange('url')}
            />
          </FormControl>
          <Button
            color="primary"
            variant="contained"
            onClick={this.handleCreateNetwork}
          >
            {labels.CREATE_NETWORK}
          </Button>
        </FlexContainer>
      </FlexContainer>
    )
  }
}

const ConnectedNetworkCreate = compose(
  withRouter,
  connect(
    getNetworks,
    { onNetworkAdd: addCustomNetwork }
  )
)(NetworkCreate)

export default class extends React.PureComponent<RouteComponentProps> {
  render() {
    const { match } = this.props
    const isCreateNetworkScreen = this.props.location.pathname.includes(
      '/create'
    )
    const title = isCreateNetworkScreen
      ? labels.CREATE_NETWORK
      : labels.NETWORK_LIST

    return (
      <NavigationLayout
        title={title}
        renderLeft={() => <ConnectedNavigationBackButton />}
        renderRight={() => {
          if (isCreateNetworkScreen) {
            return null
          }
          return (
            <AddIconButton
              onAdd={() => this.props.history.push('/settings/network/create')}
            />
          )
        }}
      >
        <Route exact path={`${match.path}/`} component={ConnectedNetworkList} />
        <Route
          path={`${match.path}/create`}
          component={ConnectedNetworkCreate}
        />
      </NavigationLayout>
    )
  }
}
