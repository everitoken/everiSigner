import * as React from 'react'
import { Typography, Grid, Link, Checkbox } from '@material-ui/core'
import { AccountStateType } from '../../store/reducer/accounts'
import * as uiActions from '../action'
import AuthenticationProtectedView from './AuthenticationProtectedView'
import FlexContainer from '../presentational/FlexContainer'
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
import { get } from 'lodash'
import { AuthorizedEntity } from '../../types'
import { authorizedEntityAdd } from '../../store/action'

type PropTypes = {
  request: {} | null
  accounts: AccountStateType[]
  onAuthorize: typeof uiActions.authorizeAccountAccess
  authorizedEntities: AuthorizedEntity[]
  onAuthorizeEntity: typeof authorizedEntityAdd
}

type StateTypes = {
  selectedAccount: AccountStateType | undefined
  data: string[]
  showBalanceList: boolean
  isEntityAuthorized: boolean
  authorizedEntity: AuthorizedEntity | undefined
}

class AccountSelect extends React.PureComponent<PropTypes, StateTypes> {
  constructor(props: PropTypes) {
    super(props)
    const rawData = JSON.parse(this.props.request.payload.data)
    const site = get(rawData, 'site')

    const authorizedEntity = this.props.authorizedEntities.find(
      entity => entity.host === site
    )

    this.state = {
      selectedAccount: this.props.accounts.find(({ isMain }) => isMain),
      data: [],
      showBalanceList: false,
      isEntityAuthorized: Boolean(authorizedEntity),
      authorizedEntity,
    }
  }

  handleAccountMoreClicked = () => {
    this.setState({ showBalanceList: !this.state.showBalanceList })
  }
  handleSelect = (selectedAccount: AccountStateType) => {
    this.setState({ selectedAccount })
  }
  handleAuthorize = (host: string) => {
    if (this.state.selectedAccount) {
      this.props.onAuthorizeEntity({ host })
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

  handleAddAuthorizedEntityCheck = (event: any) => {
    this.setState({
      isEntityAuthorized: event.target.checked,
    })
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
              onPrimaryButtonClick={() => this.handleAuthorize(rawData.site)}
              onSecondaryButtonClick={this.handleCancel}
              primaryButtonText={labels.AUTHORIZE_BUTTON_TEXT}
              secondaryButtonText={labels.CANCEL_BUTTON_TEXT}
              primaryButtonDisabled={!this.state.isEntityAuthorized}
              secondaryButtonDisabled={false}
            />
          }
        >
          <FlexContainer>
            <ConnectedEntities left={left} right={right} />
            <FlexContainer justifyContent="center">
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
              <Typography variant="caption" gutterBottom>
                By clicking{' '}
                <Typography variant="caption" color="primary" inline>
                  AUTHORIZE
                </Typography>{' '}
                the site will only see the <b>account name</b> and{' '}
                <b>address</b>.
              </Typography>
            </FlexContainer>

            {!this.state.authorizedEntity ? (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Checkbox
                  checked={this.state.isEntityAuthorized}
                  onChange={this.handleAddAuthorizedEntityCheck}
                />
                <Typography variant="caption">
                  This entity is not authorized, do you want to authorize it
                  now?
                </Typography>
              </div>
            ) : null}
          </FlexContainer>
        </PopupLayout>
      </Container>
    )
  }
}

const ConnectedAccountSelect = connect(
  getAuthenticateAccountRequest,
  {
    onAuthorize: uiActions.authorizeAccountAccess,
    onAuthorizeEntity: authorizedEntityAdd,
  }
)(AccountSelect)

export default () => (
  <AuthenticationProtectedView>
    <ConnectedAccountSelect />
  </AuthenticationProtectedView>
)
