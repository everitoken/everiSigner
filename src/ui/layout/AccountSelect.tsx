import * as React from 'react'
import FlexContainer from '../presentational/FlexContainer'
import { Typography, Button, FormHelperText } from '@material-ui/core'
import { AccountStateType } from '../../store/reducer/accounts'
import * as uiActions from '../action'
import AuthenticationProtectedView from './AuthenticationProtectedView'
import { getAuthenticateAccountRequest } from '../../store/getter'
import { connect } from 'react-redux'
import SiteLocation from '../presentational/SiteLocation'
import AccountSelectList from '../presentational/AccountSelectList'

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
  render() {
    const rawData = JSON.parse(this.props.request.payload.data)

    return (
      <FlexContainer withPadding justifyContent="flex-start">
        <div>
          <Typography variant="h4">
            Request to access your account data
          </Typography>
        </div>
        <div
          style={{
            display: 'flex',
            flex: 1,
            padding: '10px 0',
            overflow: 'scroll',
            flexDirection: 'column',
          }}
        >
          <div style={{ marginBottom: '20px' }}>
            {<SiteLocation url={rawData.site} />}
            is requesting to access your account information.
          </div>
          <div>
            <div
              style={{
                maxHeight: '290px',
                overflow: 'scroll',
              }}
            >
              {this.state.selectedAccount && (
                <AccountSelectList
                  accounts={this.props.accounts}
                  selected={this.state.selectedAccount}
                  onSelect={this.handleSelect}
                />
              )}
            </div>
            <div style={{ padding: '10px 0' }}>
              <FormHelperText>
                * Only <b>Account name</b> and <b>Public key</b> will become
                available to the website.
              </FormHelperText>
            </div>
          </div>
        </div>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={this.handleAuthorize}
        >
          Authorize
        </Button>
      </FlexContainer>
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
