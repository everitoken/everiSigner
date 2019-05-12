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
  Chip,
  Divider,
  Typography,
} from '@material-ui/core'
import MoreIcon from '@material-ui/icons/MoreVert'

type AccountListItemPropTypes = {
  account: AccountStateType
}
type AccountListItemStateProps = {}
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
  }
  handleCopy = (account: AccountStateType) => {
    navigator.clipboard.writeText(account.publicKey).then(() => {
      this.setState({ showCopied: true })
      this.clearTimeoutHandler = setTimeout(() => {
        this.setState({ showCopied: false })
      }, 3000)
    })
  }
  render() {
    const { account } = this.props
    return (
      <React.Fragment>
        <ListItem alignItems="flex-start">
          <FlexContainer>
            <FlexContainer direction="row" alignItems="center">
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
              {account.type === 'default' ? (
                <Chip
                  style={{ fontSize: '10px', padding: 4 }}
                  label="Default"
                  variant="outlined"
                  color="primary"
                />
              ) : null}
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
            <IconButton aria-label="Delete">
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
        title="账户列表"
        renderLeft={() => <ConnectedNavigationBackButton />}
      >
        <FlexContainer>
          <List style={{ alignSelf: 'stretch' }}>
            {this.props.accounts.map(account => (
              <AccountListItem account={account} />
            ))}
          </List>
        </FlexContainer>
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
