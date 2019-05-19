import * as React from 'react'
import FlexContainer from '../presentational/FlexContainer'
import { Typography, Grid, Link } from '@material-ui/core'
import { AccountStateType } from '../../store/reducer/accounts'
import * as uiActions from '../action'
import AuthenticationProtectedView from './AuthenticationProtectedView'
import { getAuthenticateAccountRequest } from '../../store/getter'
import { connect } from 'react-redux'
import Container from '../presentational/Container'
import ScreenHeader from '../presentational/ScreenHeader'
import ConnectedEntities from '../presentational/ConnectedEntities'
import CircularEntity from '../presentational/CircularEntity'
import BottomButtonGroup from '../presentational/BottomButtonGroup'
import AccountSelectDialog from '../presentational/AccountSelect'
import ConnectedBalanceTable from './ConnectedBalanceTable'
import labels from '../../labels';

type PropTypes = {
  request: {} | null
  accounts: AccountStateType[]
  onAuthorize: typeof uiActions.authorizeAccountAccess
}

type StateTypes = {
  selectedAccount: AccountStateType | undefined
  data: string[]
  showBalanceTable: boolean
}

class AccountSelect extends React.PureComponent<PropTypes, StateTypes> {
  state = {
    selectedAccount: this.props.accounts.find(({ isMain }) => isMain),
    data: [],
    showBalanceTable: false,
  }
  handleAccountMoreClicked = () => {
    this.setState({ showBalanceTable: !this.state.showBalanceTable })
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
      this.setState({selectedAccount})
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
              this.state.showBalanceTable ? (
                <ConnectedBalanceTable publicKey={selectedAccount.publicKey} />
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
        <FlexContainer alignItems="center">
          <div
            style={{
              display: 'flex',
              flex: 1,
              alignSelf: 'stretch',
              margin: '0 0 3rem 0',
            }}
          >
            <ScreenHeader title={labels.CONNECT_REQUEST} />
          </div>

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

          <BottomButtonGroup
            onPrimaryButtonClick={this.handleAuthorize}
            onSecondaryButtonClick={this.handleCancel}
            primaryButtonText={labels.AUTHORIZE_BUTTON_TEXT}
            secondaryButtonText={labels.CANCEL_BUTTON_TEXT}
          />
        </FlexContainer>
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
