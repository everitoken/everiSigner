import * as React from 'react'
import { NavigationLayout } from '../presentational/MainLayout'
import ConnectedNavigationBackButton from './NavigationButtons'
import FlexContainer from '../presentational/FlexContainer'
import { RouteComponentProps, Route } from 'react-router-dom'
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
import { isSameNetwork } from '../util'
import InfoArea from '../presentational/InfoArea'
import { isEmpty } from 'lodash'
import Button from '../presentational/InlineButton'
import parseUrl from 'parse-url'
import NetworkContextProvider, { NetworkContext } from '../../context/Network'
import AddIconButton from '../presentational/AddIconButton'
import { useTranslation } from 'react-i18next'

const ITEM_HEIGHT = 40

type NetworkItemMoreMenuPropTypes = {
  anchorEl: any
  network: NetworkItemType
  isSelected: boolean
  onClose: () => void
  onSelectNetwork: Function
  onRemoveNetwork: Function
}

function NetworkItemMoreMenu(props: NetworkItemMoreMenuPropTypes) {
  const [network, setNetwork] = React.useState(props.network)
  const { anchorEl } = props
  const open = Boolean(anchorEl)
  const { t } = useTranslation()

  function handleClose() {
    props.onClose()
  }

  return (
    <Menu
      disableAutoFocusItem
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      PaperProps={{
        style: {
          maxHeight: ITEM_HEIGHT * 4.5,
          width: 200,
        },
      }}
    >
      <MenuItem
        disabled={props.isSelected}
        onClick={() => {
          props.onSelectNetwork(network)
          handleClose()
        }}
      >
        {t('SET_NETWORK_AS_DEFAULT')}
      </MenuItem>

      <MenuItem
        disabled={!network.isCustom}
        onClick={() => {
          props.onRemoveNetwork(network)
          handleClose()
        }}
      >
        {t('REMOVE_NETWORK')}
      </MenuItem>
    </Menu>
  )
}

function NetworkList() {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [isSelected, setIsSelected] = React.useState(false)
  const { networks, selected, selectNetwork, removeNetwork } = React.useContext(
    NetworkContext
  )
  const [currentNetwork, setCurrentNetwork] = React.useState(selected)

  const handleMoreClick = (event: any, currentNetwork: NetworkItemType) => {
    setAnchorEl(event.currentTarget)
    setIsSelected(isSameNetwork(currentNetwork, selected))
    setCurrentNetwork(currentNetwork)
  }

  return (
    <div style={{ flex: '1 1 auto', height: '476px', overflow: 'scroll' }}>
      <List>
        <NetworkItemMoreMenu
          isSelected={isSelected}
          network={selected}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          onSelectNetwork={() => selectNetwork(currentNetwork)}
          onRemoveNetwork={() => removeNetwork(currentNetwork)}
        />
        {networks.map((network, i) => (
          <React.Fragment key={network.url}>
            <ListItem key={network.url} role={undefined} button>
              <Badge
                variant="dot"
                color="secondary"
                invisible={!isSameNetwork(selected, network)}
              >
                <NetworkListItem key={network.location} network={network} />
              </Badge>
              <ListItemSecondaryAction>
                <IconButton
                  aria-label="More"
                  onClick={event => handleMoreClick(event, network)}
                >
                  <MoreIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>

            {i !== networks.length - 1 ? <Divider variant="fullWidth" /> : null}
          </React.Fragment>
        ))}
      </List>
    </div>
  )
}

function NetworkCreate(props: RouteComponentProps) {
  const { networks, addNetwork } = React.useContext(NetworkContext)
  const urls = networks.map(({ url }) => url)
  const [url, setUrl] = React.useState('')
  const [location, setLocation] = React.useState('')
  const [errorMsg, setErrorMsg] = React.useState('')
  const [urlError, setUrlError] = React.useState(false)
  const [locationError, setLocationError] = React.useState(false)
  const { t } = useTranslation()

  const handleFieldChange = (name: 'url' | 'location') => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target
    if (name === 'url') {
      setUrl(value)
    } else if (name === 'location') {
      setLocation(value)
    }
  }

  const validate = () => {
    // validate url, and location
    if (isEmpty(location) || location.length > 12) {
      setLocationError(true)
      setErrorMsg('Invalid location name')
      return false
    }

    let validUrl = true

    try {
      parseUrl(url, true)
    } catch (e) {
      validUrl = false
    }

    if (isEmpty(url) || !validUrl) {
      setUrlError(true)
      setErrorMsg('Not a valid url.')

      return false
    }

    // validate url or location exist in list
    if (urls.includes(url)) {
      setErrorMsg('This url exits already')
      setUrlError(true)

      return false
    }

    return true
  }

  const handleCreateNetwork = () => {
    if (validate()) {
      addNetwork({
        url: url,
        name: 'custom',
        location: location,
        isProduction: false,
        isCustom: true,
      })
      setTimeout(() => {
        props.history.goBack()
      }, 300)
    }
  }

  return (
    <FlexContainer justifyContent="space-between">
      <div style={{ width: '100%' }}>
        <InfoArea>
          <ul>
            <li>Create custom network</li>
            <li>Custom network can be deleted</li>
          </ul>
        </InfoArea>
        {!isEmpty(errorMsg) ? (
          <p
            style={{
              paddingLeft: '8px',
              color: 'red',
              fontFamily: 'Roboto Mono',
            }}
          >
            {errorMsg}
          </p>
        ) : null}
      </div>

      <FlexContainer withPadding justifyContent="space-around">
        <FormControl fullWidth>
          <InputLabel htmlFor="network-location">
            {t('NETWORK_NAME')}
          </InputLabel>
          <Input
            required
            error={locationError}
            id="location"
            type="text"
            value={location}
            onChange={handleFieldChange('location')}
          />
        </FormControl>
        <FormControl fullWidth>
          <InputLabel htmlFor="network-url">{t('NETWORK_URL')}</InputLabel>
          <Input
            required
            error={urlError}
            id="url"
            type="text"
            value={url}
            onChange={handleFieldChange('url')}
          />
        </FormControl>
        <Button
          color="primary"
          disabled={isEmpty(location) || isEmpty(url)}
          variant="contained"
          onClick={handleCreateNetwork}
        >
          {t('CREATE_NETWORK')}
        </Button>
      </FlexContainer>
    </FlexContainer>
  )
}

export default function NetworkScreen({
  match,
  location,
  history,
}: RouteComponentProps) {
  const isCreateNetworkScreen = location.pathname.includes('/create')
  const { t } = useTranslation()
  const title = isCreateNetworkScreen ? t('CREATE_NETWORK') : t('NETWORK_LIST')

  return (
    <NetworkContextProvider>
      <NavigationLayout
        title={title}
        renderLeft={() => <ConnectedNavigationBackButton />}
        renderRight={() => {
          if (isCreateNetworkScreen) {
            return null
          }
          return (
            <AddIconButton
              onAdd={() => history.push('/settings/network/create')}
            />
          )
        }}
      >
        <Route exact path={`${match.path}/`} component={NetworkList} />
        <Route path={`${match.path}/create`} component={NetworkCreate} />
      </NavigationLayout>
    </NetworkContextProvider>
  )
}
