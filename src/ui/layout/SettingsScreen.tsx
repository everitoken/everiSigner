import * as React from 'react'
import MainLayout, {
  HeaderTitle,
  NavigationLayout,
} from '../presentational/MainLayout'
import { Route, RouteComponentProps, withRouter } from 'react-router'
import AboutScreen from './AboutScreen'
import NetworkScreen from './NetworkScreen'
import ForwardIcon from '@material-ui/icons/ChevronRight'
import InfoIcon from '@material-ui/icons/Info'
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  withStyles,
  StyledComponentProps,
  Divider,
} from '@material-ui/core'
import FlexContainer from '../presentational/FlexContainer'
import { compose } from 'redux'
import { ConnectedNavigationBackButton } from './NavigationButtons'
import labels from '../../labels'
import NetworkIcon from '@material-ui/icons/CloudCircle'

type PropTypes = {}

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
        title="Browse settings"
        renderLeft={() => <ConnectedNavigationBackButton />}
      >
        <FlexContainer>
          <List className={classes && classes.root}>
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
            <Divider />
            <ListItem
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
          </List>
        </FlexContainer>
      </NavigationLayout>
    )
  }
}

const ConnectedSettings = compose(
  withStyles(styles),
  withRouter
)(Settings)

export default class SettingsScreen extends React.PureComponent<
  RouteComponentProps
> {
  render() {
    const { match } = this.props
    return (
      <MainLayout
        renderLogo
        renderHead={() => <HeaderTitle title="Settings" />}
      >
        <Route exact path={`${match.path}/`} component={ConnectedSettings} />
        <Route path={`${match.path}/about`} component={AboutScreen} />
        <Route path={`${match.path}/network`} component={NetworkScreen} />
      </MainLayout>
    )
  }
}
