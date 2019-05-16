import * as React from 'react'
import WithAuthentication from './WithAuthentication'
import InvalidRoute from './InvalidRoute'

import FlexContainer from '../presentational/FlexContainer'
import { NavigationLayout } from '../presentational/MainLayout'
import { ConnectedNavigationBackButton } from './NavigationButtons'
import { AccountStateType } from '../../store/reducer/accounts'
import { getDecryptedAccounts } from '../../store/getter'
import { connect } from 'react-redux'
import {
  List,
  ListItem,
  ListItemSecondaryAction,
  IconButton,
  Divider,
  Typography,
  Menu,
  MenuItem,
  Badge,
} from '@material-ui/core'
import MoreIcon from '@material-ui/icons/MoreVert'
import labels from '../../labels'
import { copyToClipboard, setMainAccount, removeAccount } from '../action'
import { withRouter, RouteComponentProps } from 'react-router'
import { compose } from 'redux'
import { Link } from 'react-router-dom'

const ITEM_HEIGHT = 40

type AccountMoreMenuPropTypes = {
  anchorEl: any
  account: AccountStateType
  onClose: () => void
  onCopyAddressClicked: typeof copyToClipboard
  onSetMainAccountClicked: typeof setMainAccount
  onRemoveAccount: typeof removeAccount
}

class AccountMoreMenu extends React.Component<
  AccountMoreMenuPropTypes & RouteComponentProps
> {
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
          onClick={() => {
            this.props.onCopyAddressClicked(this.props.account.publicKey)
            this.handleClose()
          }}
        >
          {labels.COPY_ADDRESS}
        </MenuItem>
        <MenuItem
          onClick={() => {
            this.props.history.push(`/account/${this.props.account.id}/qr`)
            this.handleClose()
          }}
        >
          {labels.SHOW_ADDRESS_AS_QR}
        </MenuItem>
        <MenuItem
          disabled={this.props.account.isMain}
          onClick={() => {
            this.props.onSetMainAccountClicked(this.props.account)
            this.handleClose()
          }}
        >
          {labels.MAKE_DEFAULT_ACCOUNT}
        </MenuItem>
        <MenuItem
          onClick={() => {
            this.props.history.push(`/account/${this.props.account.id}/balance`)
            this.handleClose()
          }}
        >
          {labels.SHOW_ACCOUNT_BALANCE}
        </MenuItem>
        <MenuItem
          onClick={() => {
            this.props.history.push(`/account/${this.props.account.id}/key`)
            this.handleClose()
          }}
        >
          {labels.EXPORT_PRIVATE_KEY}
        </MenuItem>

        <MenuItem
          disabled={this.props.account.type === 'seed'}
          onClick={() => {
            const yes = confirm(
              `${labels.CONFIRM_REMOVE_ACCOUNT}: "${this.props.account.name}"?`
            )
            if (yes) {
              this.props.onRemoveAccount(this.props.account)
            }
            this.handleClose()
          }}
        >
          {labels.REMOVE_ACCOUNT}
        </MenuItem>
      </Menu>
    )
  }
}

const ConnectedAccountMoreMenu = compose(
  withRouter,
  connect(
    null,
    {
      onCopyAddressClicked: copyToClipboard,
      onSetMainAccountClicked: setMainAccount,
      onRemoveAccount: removeAccount,
    }
  )
)(AccountMoreMenu)

type AccountListItemPropTypes = {
  account: AccountStateType
}
type AccountListItemStateProps = { showCopied: boolean; menuEl: any }
class AccountListItem extends React.PureComponent<
  AccountListItemPropTypes,
  AccountListItemStateProps
> {
  clearTimeoutHandler: any
  constructor(props: AccountListItemPropTypes) {
    super(props)
    this.clearTimeoutHandler = null
  }
  componentWillUnmount() {
    if (this.clearTimeoutHandler) {
      clearTimeout(this.clearTimeoutHandler)
    }
  }

  state = {
    showCopied: false,
    menuEl: null,
  }

  handleCopy = (account: AccountStateType) => {
    navigator.clipboard.writeText(account.publicKey).then(() => {
      this.setState({ showCopied: true })
      this.clearTimeoutHandler = setTimeout(() => {
        this.setState({ showCopied: false })
      }, 3000)
    })
  }

  handleMoreClick = (event: any) => {
    this.setState({ menuEl: event.currentTarget })
  }

  render() {
    const { account } = this.props
    return (
      <React.Fragment>
        <ConnectedAccountMoreMenu
          anchorEl={this.state.menuEl}
          onClose={() => this.setState({ menuEl: null })}
          account={account}
        />
        <ListItem alignItems="flex-start">
          <FlexContainer>
            <FlexContainer direction="row" alignItems="center">
              <Badge
                variant="dot"
                color="secondary"
                invisible={!account.isMain}
              >
                <p
                  style={{
                    fontFamily: 'Roboto Mono',
                    fontSize: '18px',
                    paddingRight: '8px',
                    margin: 0,
                  }}
                >
                  {account.name}
                </p>
              </Badge>
            </FlexContainer>
            <FlexContainer direction="row" alignItems="center">
              <p
                style={{
                  fontFamily: 'Roboto Mono',
                  cursor: 'pointer',
                  paddingRight: '8px',
                }}
                onClick={() => this.handleCopy(account)}
              >
                {`${account.publicKey.slice(0, 15)}...${account.publicKey.slice(
                  -15
                )}`}
              </p>
              {this.state.showCopied ? (
                <Typography variant="caption">Copied</Typography>
              ) : null}
            </FlexContainer>
          </FlexContainer>
          <ListItemSecondaryAction>
            <IconButton aria-label="More" onClick={this.handleMoreClick}>
              <MoreIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <Divider variant="fullWidth" />
      </React.Fragment>
    )
  }
}

type AccountListPropTypes = {
  accounts: AccountStateType[]
}

type AccountListStateTypes = {}

class AccountList extends React.PureComponent<
  AccountListPropTypes,
  AccountListStateTypes
> {
  render() {
    return (
      <NavigationLayout
        title={labels.ACCOUNT_LIST}
        renderLeft={() => <ConnectedNavigationBackButton />}
      >
        {this.props.accounts.length ? (
          <FlexContainer>
            <List style={{ alignSelf: 'stretch' }}>
              {this.props.accounts.map(account => (
                <AccountListItem key={account.id} account={account} />
              ))}
            </List>
          </FlexContainer>
        ) : (
          <FlexContainer justifyContent="center" alignItems="center">
            <p>{labels.NO_ACCOUNT_AVAILABLE}</p>
            <div>
              <Link
                style={{ fontSize: 16, textDecoration: 'none' }}
                to="/account/create"
              >
                {labels.CREATE_NEW_ACCOUNT}
              </Link>
            </div>
          </FlexContainer>
        )}
      </NavigationLayout>
    )
  }
}

const ConnectedAccountList = connect(getDecryptedAccounts)(AccountList)

export default () => (
  <WithAuthentication>
    {({ status }) => {
      if (status === 'password') {
        return <ConnectedAccountList />
      }

      return (
        <InvalidRoute message="everiSigner needs to be unlock in order to show account list." />
      )
    }}
  </WithAuthentication>
)
