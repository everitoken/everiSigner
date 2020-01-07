import * as React from 'react'
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
import AccountBarLayout from './AccountBarLayout'
import FlexContainer from '../presentational/FlexContainer'
import Divider from '../presentational/Divider'
import { Route, useHistory, useRouteMatch } from 'react-router-dom'
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
  mainAccount?: AccountStateType
  accounts: AccountStateType[]
}

function Home(props: PropTypes) {
  const [index, setIndex] = React.useState(0)
  const history = useHistory()
  const match = useRouteMatch()

  function handleTabChange(_: any, index: number) {
    setIndex(index)
  }

  React.useEffect(() => {
    if (!props.mainAccount) {
      history.push('/home/setup')
    } else {
      history.push('/home/ft')
    }
  }, [props.mainAccount])

  const hasMainAccount = Boolean(props.mainAccount)

  if (!match) {
    return null
  }

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
          value={hasMainAccount ? index : Infinity}
          onChange={handleTabChange}
          showLabels
        >
          <BottomNavigationAction
            disabled={!hasMainAccount}
            label={labels.FUNGIBLE_BALANCE}
            onClick={() => history.push(`${match.path}/ft`)}
          />
          <BottomNavigationAction
            disabled={!hasMainAccount}
            label={labels.NFTs_LIST}
            onClick={() => history.push(`${match.path}/nft`)}
          />
          <BottomNavigationAction
            disabled={!hasMainAccount}
            label={labels.ACCOUNT_DETAIL}
            onClick={() => history.push(`${match.path}/detail`)}
          />
        </BottomNavigation>
      </FlexContainer>
    </AccountBarLayout>
  )
}

export default connect(getForHome)(Home)
