import * as React from 'react'
import FlexContainer from '../presentational/FlexContainer'
import { Typography, Grid } from '@material-ui/core'
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

type PropTypes = {
  request: {} | null
  accounts: AccountStateType[]
  onAuthorize: typeof uiActions.authorizeAccountAccess
}

type StateTypes = {
  selectedAccount: AccountStateType | undefined
}
class AccountSelect extends React.PureComponent<PropTypes, StateTypes> {
  state = {
    selectedAccount: this.props.accounts.find(
      account => account.type === 'default'
    ),
  }
  handleSelect = (selectedAccount: AccountStateType) => {
    this.setState({ selectedAccount })
  }
  handleAuthorize = () => {
    if (this.state.selectedAccount) {
      this.props.onAuthorize(this.state.selectedAccount, this.props.request)
    }
  }
  handleCancel = () => {
    if (this.state.selectedAccount) {
      this.props.onAuthorize(null, this.props.request)
    }
  }
  render() {
    const rawData = JSON.parse(this.props.request.payload.data)
    const { selectedAccount } = this.state

    const left = (
      <CircularEntity title={rawData.title} subtitle={rawData.site} />
    )

    const accountName = selectedAccount ? selectedAccount.name : '-'
    const publicKey = selectedAccount ? selectedAccount.publicKey : '-'
    const right = <CircularEntity title={accountName} subtitle={publicKey} />

    return (
      <Container>
        <FlexContainer alignItems="center">
          <div style={{ margin: '0 0 3rem 0', width: '100%' }}>
            <ScreenHeader title="Connect Request" />
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
