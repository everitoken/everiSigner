import * as React from 'react'
import AccountBarLayout from './AccountBarLayout'
import FlexContainer from '../presentational/FlexContainer'
import {
  Grid,
  IconButton,
  Typography,
  BottomNavigation,
  BottomNavigationAction,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { connect } from 'react-redux'
import { AccountStateType } from '../../store/reducer/accounts'
import AccountAvatar from '../presentational/AccountAvatar'
import { getForHome, getForHomeAppBar } from '../../store/getter'
import AccountSelect from '../presentational/AccountSelect'
import ConnectedBalanceTable from './ConnectedBalanceTable'
import { setMainAccount, copyToClipboard } from '../action'
import labels from '../../labels'
import Divider from '../presentational/Divider'
import ForwardIcon from '@material-ui/icons/ChevronRight'
import InfoIcon from '@material-ui/icons/Info'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import QR from '../presentational/QR'
import Tooltip from '../presentational/Tooltip'
import { compose } from 'redux'

type HomeAppBarPropTypes = {
  mainAccount: AccountStateType | undefined
  accounts: AccountStateType[]
  onAccountSelect: typeof setMainAccount
  onAccountAvatarClick: typeof copyToClipboard
}

type HomeAppBarStateProps = {
  showBalanceTable: boolean
  clickedAccount: AccountStateType | null
}

class HomeAppBar extends React.PureComponent<
  HomeAppBarPropTypes,
  HomeAppBarStateProps
> {
  state = {
    showBalanceTable: false,
    clickedAccount: null,
  }

  componentWillUnmount() {
    this.setState({ showBalanceTable: false, clickedAccount: null })
  }

  handleAccountMoreClicked = (clickedAccount: AccountStateType) => {
    if (this.state.showBalanceTable) {
      this.setState({ showBalanceTable: false }, () => {
        this.setState({ showBalanceTable: true, clickedAccount })
      })
    } else {
      this.setState({ showBalanceTable: true, clickedAccount })
    }
  }

  render() {
    if (!this.props.mainAccount) {
      return null
    }

    return (
      <Grid container spacing={8} justify="space-between">
        <Grid item xs={2} spacing={8}>
          <AccountSelect
            selected={this.props.mainAccount}
            onSelect={this.props.onAccountSelect}
            accounts={this.props.accounts}
            onAccountMoreClicked={this.handleAccountMoreClicked}
            detailComponent={
              this.state.showBalanceTable ? (
                <ConnectedBalanceTable
                  publicKey={
                    this.state.clickedAccount != null
                      ? this.state.clickedAccount.publicKey
                      : ''
                  }
                />
              ) : null
            }
          >
            {({ handleOpen }) => (
              <IconButton onClick={handleOpen}>
                <MenuIcon />
              </IconButton>
            )}
          </AccountSelect>
        </Grid>
        <Grid item justify="center" style={{ alignSelf: 'center' }}>
          <AccountAvatar
            account={this.props.mainAccount}
            onClick={account =>
              this.props.onAccountAvatarClick(account.publicKey)
            }
          />
        </Grid>
        <Grid item justify="center" xs={2} />
        <Divider />
      </Grid>
    )
  }
}

const ConnectedHomeAppBar = connect(
  getForHomeAppBar,
  { onAccountSelect: setMainAccount, onAccountAvatarClick: copyToClipboard }
)(HomeAppBar)

type FungibleOverviewPropTypes = { publicKey: string }
class FungibleOverview extends React.PureComponent<FungibleOverviewPropTypes> {
  render() {
    return (
      <FlexContainer>
        <Typography variant="h6" style={{ padding: '16px 0 0 16px' }}>
          {labels.FUNGIBLE_BALANCE}
        </Typography>
        <ConnectedBalanceTable showLink publicKey={this.props.publicKey} />
      </FlexContainer>
    )
  }
}

type AccountOverviewPropTypes = {
  account: AccountStateType
  onQrCodeClicked: typeof copyToClipboard
}

class AccountOverview extends React.PureComponent<
  AccountOverviewPropTypes & RouteComponentProps
> {
  render() {
    const { account } = this.props
    return (
      <FlexContainer alignItems="center">
        <Tooltip title={labels.CLICK_QR_TO_COPY} enterDelay={400}>
          <div
            style={{
              width: 150,
              height: 150,
              marginTop: '4px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <QR
              data={account.publicKey}
              width={150}
              onClick={this.props.onQrCodeClicked}
            />
          </div>
        </Tooltip>
        <span style={{ fontFamily: 'Roboto Mono', padding: 8 }}>
          {account.publicKey}
        </span>
        <Divider />
        <List style={{ width: '100%' }}>
          <ListItem
            divider
            button
            onClick={() => this.props.history.push('/settings/about')}
          >
            <InfoIcon color="action" />
            <ListItemText primary="First" secondary="second" />
            <ListItemIcon>
              <ForwardIcon />
            </ListItemIcon>
          </ListItem>
        </List>
      </FlexContainer>
    )
  }
}

const ConnectedAccountOverview = compose(
  withRouter,
  connect(
    null,
    { onQrCodeClicked: copyToClipboard }
  )
)(AccountOverview)

type PropTypes = {
  mainAccount: AccountStateType | undefined
  accounts: AccountStateType[]
}

type StateTypes = {
  index: number
  showBalanceTable: boolean
  clickedAccount: AccountStateType | null
}

class Home extends React.PureComponent<PropTypes, StateTypes> {
  state = {
    index: 0,
    showBalanceTable: false,
    clickedAccount: null,
  }
  handleTabChange = (_: any, index: number) => {
    this.setState({ index })
  }

  renderContent = (currentAccount: AccountStateType) => {
    if (this.state.index === 0) {
      const publicKey =
        this.state.clickedAccount != null
          ? this.state.clickedAccount.publicKey
          : this.props.mainAccount.publicKey

      return <FungibleOverview publicKey={publicKey} />
    } else if (this.state.index === 2) {
      const publicKey =
        this.state.clickedAccount != null
          ? this.state.clickedAccount.publicKey
          : this.props.mainAccount.publicKey

      return <FungibleOverview publicKey={publicKey} />
    }

    return <ConnectedAccountOverview account={currentAccount} />
  }

  render() {
    if (!this.props.mainAccount) {
      return null
    }

    return (
      <AccountBarLayout>
        <FlexContainer>
          <ConnectedHomeAppBar />
          {this.renderContent(this.props.mainAccount)}
          <BottomNavigation
            style={{ width: '100%', borderTop: '1px solid #ccc' }}
            value={this.state.index}
            onChange={this.handleTabChange}
            showLabels
          >
            <BottomNavigationAction label={labels.FUNGIBLE_BALANCE} />} />
            <BottomNavigationAction label={labels.NFTs_LIST} />
            <BottomNavigationAction label={labels.ACCOUNT_DETAIL} />
          </BottomNavigation>
        </FlexContainer>
      </AccountBarLayout>
    )
  }
}

export default connect(
  getForHome,
  { onAccountSelect: setMainAccount, onAccountAvatarClick: copyToClipboard }
)(Home)
