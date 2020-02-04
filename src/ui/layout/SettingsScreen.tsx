import * as React from 'react'
import MainLayout, {
  HeaderTitle,
  NavigationLayout,
} from '../presentational/MainLayout'
import { Route, useHistory, RouteComponentProps } from 'react-router'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import AboutScreen from './AboutScreen'
import NetworkScreen from './NetworkScreen'
import InfoIcon from '@material-ui/icons/Info'
import SaveIcon from '@material-ui/icons/SaveAlt'
import LockIcon from '@material-ui/icons/Lock'
import { List, ListItemText } from '@material-ui/core'
import FlexContainer from '../presentational/FlexContainer'
import ConnectedNavigationBackButton from './NavigationButtons'
import NetworkIcon from '@material-ui/icons/CloudCircle'
import AccountIcon from '@material-ui/icons/AccountBox'
import LanguageIcon from '@material-ui/icons/Language'
import WalletExportScreen from '../layout/WalletExportScreen'
import WalletMiscSettings from '../layout/WalletMiscSettings'
import { removePassword } from '../action'
import CustomListItem from '../presentational/CustomListItem'

function Settings() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const history = useHistory()

  return (
    <NavigationLayout
      title={t('BROWSE_SETTINGS')}
      renderLeft={() => <ConnectedNavigationBackButton />}
    >
      <FlexContainer>
        <List style={{ width: '100%' }}>
          <CustomListItem
            onClick={() => {
              dispatch(removePassword())
              history.push('/')
            }}
            LeftIcon={LockIcon}
            forward={false}
          >
            <ListItemText
              primary={t('LOCK_WALLET')}
              secondary={t('LOCK_WALLET_SECONDARY_TEXT')}
            />
          </CustomListItem>
          <CustomListItem
            onClick={() => history.push('/account/list')}
            LeftIcon={AccountIcon}
          >
            <ListItemText
              primary={t('ACCOUNT_LIST')}
              secondary={t('ACCOUNT_LIST_SECONDARY_TEXT')}
            />
          </CustomListItem>
          <CustomListItem
            onClick={() => history.push('/settings/network')}
            LeftIcon={NetworkIcon}
          >
            <ListItemText
              primary={t('NETWORK')}
              secondary={t('NETWORK_NAVIGATION_SECONDARY_TEXT')}
            />
          </CustomListItem>
          <CustomListItem
            onClick={() => history.push('/settings/export')}
            LeftIcon={SaveIcon}
          >
            <ListItemText
              primary={t('BACKUP_WALLET')}
              secondary={t('BACKUP_WALLET_SECONDARY_TEXT')}
            />
          </CustomListItem>
          <CustomListItem
            onClick={() => history.push('/settings/misc')}
            LeftIcon={LanguageIcon}
          >
            <ListItemText
              primary={t('LANGUAGE')}
              secondary={t('LANGUAGE_DESC')}
            />
          </CustomListItem>
          <CustomListItem
            onClick={() => history.push('/settings/about')}
            LeftIcon={InfoIcon}
            divider={false}
          >
            <ListItemText
              primary={t('ABOUT_TITLE')}
              secondary={t('ABOUT_NAVIGATION_SECONDARY_TEXT')}
            />
          </CustomListItem>
        </List>
      </FlexContainer>
    </NavigationLayout>
  )
}

export default function SettingsScreen({ match }: RouteComponentProps) {
  const { t } = useTranslation()

  return (
    <MainLayout
      renderLogo
      renderHead={() => <HeaderTitle title={t('SETTINGS')} />}
    >
      <Route exact path={`${match.path}/`} component={Settings} />
      <Route path={`${match.path}/about`} component={AboutScreen} />
      <Route path={`${match.path}/network`} component={NetworkScreen} />
      <Route path={`${match.path}/export`} component={WalletExportScreen} />
      <Route path={`${match.path}/misc`} component={WalletMiscSettings} />
    </MainLayout>
  )
}
