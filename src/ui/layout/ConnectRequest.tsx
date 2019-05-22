import * as React from 'react'
import { Typography, Grid, Link } from '@material-ui/core'
import { AccountStateType } from '../../store/reducer/accounts'
import * as uiActions from '../action'
import AuthenticationProtectedView from './AuthenticationProtectedView'
import { getAuthenticateAccountRequest } from '../../store/getter'
import { connect } from 'react-redux'
import Container from '../presentational/Container'
import ConnectedEntities from '../presentational/ConnectedEntities'
import CircularEntity from '../presentational/CircularEntity'
import BottomButtonGroup from '../presentational/BottomButtonGroup'
import AccountSelectDialog from '../presentational/AccountSelect'
import ConnectedBalanceList from './FungibleBalanceList'
import labels from '../../labels'
import PopupLayout from '../presentational/PopupLayout'

type PropTypes = {
  request: {} | null
  accounts: AccountStateType[]
  onAuthorize: typeof uiActions.authorizeAccountAccess
}

type StateTypes = {
  selectedAccount: AccountStateType | undefined
  data: string[]
  showBalanceList: boolean
}

class AccountSelect extends React.PureComponent<PropTypes, StateTypes> {
  state = {
    selectedAccount: this.props.accounts.find(({ isMain }) => isMain),
    data: [],
    showBalanceList: false,
  }
  handleAccountMoreClicked = () => {
    this.setState({ showBalanceList: !this.state.showBalanceList })
  }
  handleSelect = (selectedAccount: AccountStateType) => {
    this.setState({ selectedAccount })
  }
  handleAuthorize = () => {
    if (this.state.selectedAccount) {
      this.props.onAuthorize(this.state.selectedAccount, this.props.request)
    }
  }

  handleAccountSelect = (selectedAccount: AccountStateType) => {
    this.setState({ selectedAccount })
  }
  handleCancel = () => {
    if (this.state.selectedAccount) {
      this.props.onAuthorize(null, this.props.request)
    }
  }
  render() {
    const rawData = JSON.parse(this.props.request.payload.data)

    const { selectedAccount } = this.state
    const { accounts } = this.props

    if (!selectedAccount) {
      alert('No Seed account found')
      return
    }

    const left = (
      <CircularEntity title={rawData.title} subtitle={rawData.site} />
    )

    const accountName = selectedAccount ? selectedAccount.name : '-'
    const publicKey = selectedAccount ? selectedAccount.publicKey : '-'

    const right = (
      <CircularEntity
        title={accountName}
        subtitle={publicKey}
        renderAction={() => (
          <AccountSelectDialog
            selected={selectedAccount}
            onSelect={this.handleAccountSelect}
            accounts={accounts}
            onAccountMoreClicked={this.handleAccountMoreClicked}
            detailComponent={
              this.state.showBalanceList ? (
                <ConnectedBalanceList publicKey={selectedAccount.publicKey} />
              ) : null
            }
          >
            {({ handleOpen }) => (
              <Link className="circular-entity-link" onClick={handleOpen}>
                {' '}
                (change?)
              </Link>
            )}
          </AccountSelectDialog>
        )}
      />
    )

    return (
      <Container>
        <PopupLayout
          title={labels.CONNECT_REQUEST}
          bottomButtonGroup={
            <BottomButtonGroup
              onPrimaryButtonClick={this.handleAuthorize}
              onSecondaryButtonClick={this.handleCancel}
              primaryButtonText={labels.AUTHORIZE_BUTTON_TEXT}
              secondaryButtonText={labels.CANCEL_BUTTON_TEXT}
            />
          }
        >
          <Grid container xs={12} spacing={0} justify="center">
            <Grid item xs={11}>
              <ConnectedEntities left={left} right={right} />
            </Grid>
            <Grid item xs={11} alignContent="flex-start">
              <Typography variant="headline" align="center" gutterBottom>
                "
                {`${rawData.title.slice(0, 30)}${
                  rawData.title.length > 30 ? '...' : ''
                }`}
                " would like to connect to your account
              </Typography>
              <Typography variant="caption" gutterBottom>
                This site is requesting access to view your current account
                address. Always make sure you trust the sites you are
                interacting.
              </Typography>
              <Typography variant="caption">
                By clicking{' '}
                <Typography variant="caption" color="primary" inline>
                  AUTHORIZE
                </Typography>{' '}
                the site will only see the <b>account name</b> and{' '}
                <b>address</b>.
              </Typography>
            </Grid>
          </Grid>
        </PopupLayout>
      </Container>
    )
  }
}

const ConnectedAccountSelect = connect(
  getAuthenticateAccountRequest,
  {
    onAuthorize: uiActions.authorizeAccountAccess,
  }
)(AccountSelect)

export default () => (
  <AuthenticationProtectedView>
    <ConnectedAccountSelect />
  </AuthenticationProtectedView>
)
