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
import { connect, useSelector, useDispatch } from 'react-redux'
import { AccountStateType } from '../../store/reducer/accounts'
import AccountAvatar from '../presentational/AccountAvatar'
import { getForHome } from '../../store/getter'
import AccountSelect from '../presentational/AccountSelect'
import labels from '../../labels'
import Divider from '../presentational/Divider'
import { RouteComponentProps, Route, withRouter } from 'react-router-dom'
import { compose } from 'redux'
import AccountDetail from './AccountDetail'
import FungibleOverview from './FungibleOverview'
import NFTOverview from './NFTOverview'
import AccountPayeeCode from './AccountPayeeCode'
import AccountSign from './AccountSign'
import TransferFungibleToken from './TransferFungibleToken'
import { useCopyToClipboard } from '../../hooks/componentHooks'
import { setMainAccount } from '../action'

function HomeAppBar() {
  const { mainAccount, accounts } = useSelector(getForHome)
  const dispatch = useDispatch()

  if (!mainAccount) {
    return null
  }

  const [, handleCopy] = useCopyToClipboard(labels.COPY_ADDRESS_SUCCESSFUL)

  return (
    <Grid container justify="space-between" spacing={0}>
      <Grid item>
        <AccountSelect
          selected={mainAccount}
          onSelect={account => dispatch(setMainAccount(account))}
          accounts={accounts}
        >
          {({ handleOpen }) => (
            <IconButton onClick={handleOpen}>
              <MenuIcon />
            </IconButton>
          )}
        </AccountSelect>
      </Grid>
      <Grid
        item
        justify="center"
        style={{ alignSelf: 'center', marginLeft: '-50px' }}
      >
        <AccountAvatar
          account={mainAccount}
          onClick={account => handleCopy(account.publicKey)}
        />
      </Grid>
      <Grid item justify="center" />
      <Divider />
    </Grid>
  )
}

const AccountSetup = () => (
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
          <HomeAppBar />
          <Route path={`${match.path}/setup`} component={AccountSetup} />
          <Route path={`${match.path}/ft`} component={FungibleOverview} />
          <Route path={`${match.path}/nft`} component={NFTOverview} />
          <Route path={`${match.path}/detail`} component={AccountDetail} />
          <Route path={`${match.path}/payee`} component={AccountPayeeCode} />
          <Route
            path={`${match.path}/transferft`}
            component={TransferFungibleToken}
          />
          <Route path={`${match.path}/sign`} component={AccountSign} />

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
