import * as React from 'react'
import AccountBarLayout from './AccountBarLayout'
import FlexContainer from '../presentational/FlexContainer'
import {
  Grid,
  IconButton,
  Divider,
  Typography,
  BottomNavigation,
  BottomNavigationAction,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { connect } from 'react-redux'
import { AccountStateType } from '../../store/reducer/accounts'
import AccountAvatar from '../presentational/AccountAvatar'
import { getForHome } from '../../store/getter'
import AccountSelect from '../presentational/AccountSelect'
import ConnectedBalanceTable from './ConnectedBalanceTable'
import { setMainAccount, copyToClipboard } from '../action'
import labels from '../../labels'

type PropTypes = {
  mainAccount: AccountStateType | undefined
  accounts: AccountStateType[]
  onAccountSelect: typeof setMainAccount
  onAccountAvatarClick: typeof copyToClipboard
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

  renderContent = () => {
    if (this.state.index === 0) {
      return (
        <FlexContainer>
          <Typography variant="h6" style={{ padding: '16px 0 0 16px' }}>
            {labels.FUNGIBLE_BALANCE}
          </Typography>
          <ConnectedBalanceTable
            showLink
            publicKey={
              this.state.clickedAccount
                ? this.state.clickedAccount.publicKey
                : this.props.mainAccount.publicKey
            }
          />
        </FlexContainer>
      )
    } else if (this.state.index === 2) {
      return (
        <FlexContainer>
          <Typography variant="h6" style={{ padding: '16px 0 0 16px' }}>
            {labels.NFTs_LIST}
          </Typography>
          <ConnectedBalanceTable
            showLink
            publicKey={
              this.state.clickedAccount
                ? this.state.clickedAccount.publicKey
                : this.props.mainAccount.publicKey
            }
          />
        </FlexContainer>
      )
    }
    return <p>No defined yet</p>
  }

  render() {
    if (!this.props.mainAccount) {
      return null
    }

    return (
      <AccountBarLayout>
        <FlexContainer>
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
            <Divider variant="fullWidth" style={{ width: '100%' }} />
          </Grid>
          {this.renderContent()}
          <BottomNavigation
            style={{ width: '100%', borderTop: '1px solid #ccc' }}
            value={this.state.index}
            onChange={this.handleTabChange}
            showLabels
          >
            <BottomNavigationAction label={labels.FUNGIBLE_BALANCE} />} />
            <BottomNavigationAction label={labels.NFTs_LIST} />
            <BottomNavigationAction label="Others" />
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
