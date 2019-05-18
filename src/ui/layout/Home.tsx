import * as React from 'react'
import AccountBarLayout from './AccountBarLayout'
import FlexContainer from '../presentational/FlexContainer'
import {
  Grid,
  IconButton,
  BottomNavigation,
  BottomNavigationAction,
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
import { RouteComponentProps, Route, withRouter } from 'react-router-dom'
import { compose } from 'redux'
import AccountDetail from './AccountDetail'
import FungibleOverview from './FungibleOverview'
import NFTOverview from './NFTOverview'

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

const AccountSetup = props => (
  <FlexContainer withPadding justifyContent="center" alignItems="center">
    <p>Setup required</p>
  </FlexContainer>
)

type PropTypes = {
  mainAccount: AccountStateType
  accounts: AccountStateType[]
}

type StateTypes = {
  index: number
}

class Home extends React.PureComponent<
  PropTypes & RouteComponentProps,
  StateTypes
> {
  state = {
    index: 0,
  }
  handleTabChange = (_: any, index: number) => {
    this.setState({ index })
  }

  componentWillMount() {
    const { mainAccount, history } = this.props

    if (!mainAccount) {
      history.push('/home/setup')
    } else {
      history.push(`/home/ft`)
    }
  }

  render() {
    const { match } = this.props

    const hasMainAccount = Boolean(this.props.mainAccount)

    return (
      <AccountBarLayout>
        <FlexContainer>
          <ConnectedHomeAppBar />
          <Route path={`${match.path}/setup`} component={AccountSetup} />
          <Route path={`${match.path}/ft`} component={FungibleOverview} />
          <Route path={`${match.path}/nft`} component={NFTOverview} />
          <Route path={`${match.path}/detail`} component={AccountDetail} />

          <BottomNavigation
            style={{ width: '100%', borderTop: '1px solid #ccc' }}
            value={hasMainAccount ? this.state.index : Infinity}
            onChange={this.handleTabChange}
            showLabels
          >
            <BottomNavigationAction
              disabled={!hasMainAccount}
              label={labels.FUNGIBLE_BALANCE}
              onClick={() => this.props.history.push(`${match.path}/ft`)}
            />
            <BottomNavigationAction
              disabled={!hasMainAccount}
              label={labels.NFTs_LIST}
              onClick={() => this.props.history.push(`${match.path}/nft`)}
            />
            <BottomNavigationAction
              disabled={!hasMainAccount}
              label={labels.ACCOUNT_DETAIL}
              onClick={() => this.props.history.push(`${match.path}/detail`)}
            />
          </BottomNavigation>
        </FlexContainer>
      </AccountBarLayout>
    )
  }
}

export default compose(
  withRouter,
  connect(getForHome)
)(Home)
