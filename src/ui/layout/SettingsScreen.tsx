import * as React from 'react'
import MainLayout, {
  HeaderTitle,
  NavigationLayout,
} from '../presentational/MainLayout'
import { Route, RouteComponentProps, withRouter } from 'react-router'
import AboutScreen from './AboutScreen'
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
              <InfoIcon style={{ color: '#ccc' }} />
              <ListItemText
                primary="About"
                secondary="Learn more about everiSigner"
              />
              <ListItemIcon>
                <ForwardIcon />
              </ListItemIcon>
            </ListItem>
            <Divider />
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
      </MainLayout>
    )
  }
}
