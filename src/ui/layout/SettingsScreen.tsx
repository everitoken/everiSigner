import * as React from 'react'
import MainLayout, {
  HeaderTitle,
  NavigationLayout,
} from '../presentational/MainLayout'
import { Route, RouteComponentProps } from 'react-router'
import AboutScreen from './AboutScreen'
import NetworkScreen from './NetworkScreen'
import InfoIcon from '@material-ui/icons/Info'
import SaveIcon from '@material-ui/icons/SaveAlt'
import LockIcon from '@material-ui/icons/Lock'
import {
  List,
  ListItemText,
  withStyles,
  StyledComponentProps,
} from '@material-ui/core'
import FlexContainer from '../presentational/FlexContainer'
import { compose } from 'redux'
import ConnectedNavigationBackButton from './NavigationButtons'
import labels from '../../labels'
import NetworkIcon from '@material-ui/icons/CloudCircle'
import AccountIcon from '@material-ui/icons/AccountBox'
import WalletExportScreen from '../layout/WalletExportScreen'
import { removePassword } from '../action'
import { connect } from 'react-redux'
import CustomListItem from '../presentational/CustomListItem'

type PropTypes = {
  onLock: typeof removePassword
}

const styles = {
  root: {
    width: '100%',
  },
}

function Settings(
  props: PropTypes & StyledComponentProps & RouteComponentProps
) {
  const { classes } = props

  return (
    <NavigationLayout
      title={labels.BROWSE_SETTINGS}
      renderLeft={() => <ConnectedNavigationBackButton />}
    >
      <FlexContainer>
        <List className={classes && classes.root}>
          <CustomListItem
            onClick={() => {
              props.onLock()
              props.history.push('/')
            }}
            LeftIcon={LockIcon}
            forward={false}
          >
            <ListItemText
              primary={labels.LOCK_WALLET}
              secondary={labels.LOCK_WALLET_SECONDARY_TEXT}
            />
          </CustomListItem>
          <CustomListItem
            onClick={() => props.history.push('/account/list')}
            LeftIcon={AccountIcon}
          >
            <ListItemText
              primary={labels.ACCOUNT_LIST}
              secondary={labels.ACCOUNT_LIST_SECONDARY_TEXT}
            />
          </CustomListItem>
          <CustomListItem
            onClick={() => props.history.push('/settings/network')}
            LeftIcon={NetworkIcon}
          >
            <ListItemText
              primary={labels.NETWORK}
              secondary={labels.NETWORK_NAVIGATION_SECONDARY_TEXT}
            />
          </CustomListItem>
          <CustomListItem
            onClick={() => props.history.push('/settings/export')}
            LeftIcon={SaveIcon}
          >
            <ListItemText
              primary={labels.BACKUP_WALLET}
              secondary={labels.BACKUP_WALLET_SECONDARY_TEXT}
            />
          </CustomListItem>
          <CustomListItem
            onClick={() => props.history.push('/settings/about')}
            LeftIcon={InfoIcon}
            divider={false}
          >
            <ListItemText
              primary={labels.ABOUT}
              secondary={labels.ABOUT_NAVIGATION_SECONDARY_TEXT}
            />
          </CustomListItem>
        </List>
      </FlexContainer>
    </NavigationLayout>
  )
}

const ConnectedSettings = compose(
  connect(
    null,
    { onLock: removePassword }
  )
  withStyles(styles)
)(Settings)

export default function SettingsScreen({ match }: RouteComponentProps) {
  return (
    <MainLayout
      renderLogo
      renderHead={() => <HeaderTitle title={labels.SETTINGS} />}
    >
      <Route exact path={`${match.path}/`} component={ConnectedSettings} />
      <Route path={`${match.path}/about`} component={AboutScreen} />
      <Route path={`${match.path}/network`} component={NetworkScreen} />
      <Route path={`${match.path}/export`} component={WalletExportScreen} />
    </MainLayout>
  )
}
