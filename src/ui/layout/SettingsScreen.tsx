import * as React from 'react'
import MainLayout, {
  HeaderTitle,
  NavigationLayout,
} from '../presentational/MainLayout'
import { Route, RouteComponentProps } from 'react-router'
import AboutScreen from './AboutScreen'
import NetworkScreen from './NetworkScreen'
import ForwardIcon from '@material-ui/icons/ChevronRight'
import InfoIcon from '@material-ui/icons/Info'
import SaveIcon from '@material-ui/icons/SaveAlt'
import LockIcon from '@material-ui/icons/Lock'
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  withStyles,
  StyledComponentProps,
} from '@material-ui/core'
import FlexContainer from '../presentational/FlexContainer'
import { compose } from 'redux'
import { ConnectedNavigationBackButton } from './NavigationButtons'
import labels from '../../labels'
import NetworkIcon from '@material-ui/icons/CloudCircle'
import AccountIcon from '@material-ui/icons/AccountBox'
import WalletExportScreen from '../layout/WalletExportScreen'
import { removePassword } from '../action'
import { connect } from 'react-redux'

type PropTypes = {
  onLock: typeof removePassword
}

const styles = {
  root: {
    width: '100%',
  },
}
class Settings extends React.PureComponent<
  PropTypes & StyledComponentProps & RouteComponentProps
> {
  render() {
    const { classes } = this.props
    return (
      <NavigationLayout
        title={labels.BROWSE_SETTINGS}
        renderLeft={() => <ConnectedNavigationBackButton />}
      >
        <FlexContainer>
          <List className={classes && classes.root}>
            <ListItem
              divider
              button
              onClick={() => {
                this.props.onLock()
                this.props.history.push('/')
              }}
            >
              <LockIcon color="action" />
              <ListItemText
                primary={labels.LOCK_WALLET}
                secondary={labels.LOCK_WALLET_SECONDARY_TEXT}
              />
            </ListItem>
            <ListItem
              divider
              button
              onClick={() => this.props.history.push('/account/list')}
            >
              <AccountIcon color="action" />
              <ListItemText
                primary={labels.ACCOUNT_LIST}
                secondary={labels.ACCOUNT_LIST_SECONDARY_TEXT}
              />
              <ListItemIcon>
                <ForwardIcon />
              </ListItemIcon>
            </ListItem>
            <ListItem
              divider
              button
              onClick={() => this.props.history.push('/settings/network')}
            >
              <NetworkIcon color="action" />
              <ListItemText
                primary={labels.NETWORK}
                secondary={labels.NETWORK_NAVIGATION_SECONDARY_TEXT}
              />
              <ListItemIcon>
                <ForwardIcon />
              </ListItemIcon>
            </ListItem>
            <ListItem
              button
              divider
              onClick={() => this.props.history.push('/settings/export')}
            >
              <SaveIcon color="action" />
              <ListItemText
                primary={labels.BACKUP_WALLET}
                secondary={labels.BACKUP_WALLET_SECONDARY_TEXT}
              />
              <ListItemIcon>
                <ForwardIcon />
              </ListItemIcon>
            </ListItem>
            <ListItem
              button
              onClick={() => this.props.history.push('/settings/about')}
            >
              <InfoIcon color="action" />
              <ListItemText
                primary={labels.ABOUT}
                secondary={labels.ABOUT_NAVIGATION_SECONDARY_TEXT}
              />
              <ListItemIcon>
                <ForwardIcon />
              </ListItemIcon>
            </ListItem>
          </List>
        </FlexContainer>
      </NavigationLayout>
    )
  }
}

const ConnectedSettings = compose(
  connect(
    null,
    { onLock: removePassword }
  ),
  withStyles(styles)
)(Settings)

export default class SettingsScreen extends React.PureComponent<
  RouteComponentProps
> {
  render() {
    const { match } = this.props
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
}
