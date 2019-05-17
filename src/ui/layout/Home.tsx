import * as React from 'react'
import AccountBarLayout from './AccountBarLayout'
import FlexContainer from '../presentational/FlexContainer'
import { Grid, IconButton, Divider } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { connect } from 'react-redux'
import { AccountStateType } from '../../store/reducer/accounts'
import AccountAvatar from '../presentational/AccountAvatar'
import { getForHome } from '../../store/getter'
import AccountSelect from '../presentational/AccountSelect'
import ConnectedBalanceTable from './ConnectedBalanceTable'
import { setMainAccount, copyToClipboard } from '../action'

type PropTypes = {
  mainAccount: AccountStateType | undefined
  accounts: AccountStateType[]
  onAccountSelect: typeof setMainAccount
  onAccountAvatarClick: typeof copyToClipboard
}

type StateTypes = {
  showBalanceTable: boolean
  clickedAccount: AccountStateType | null
}

class Home extends React.PureComponent<PropTypes, StateTypes> {
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
          <p>some other content</p>
        </FlexContainer>
      </AccountBarLayout>
    )
  }
}

export default connect(
  getForHome,
  { onAccountSelect: setMainAccount, onAccountAvatarClick: copyToClipboard }
)(Home)
