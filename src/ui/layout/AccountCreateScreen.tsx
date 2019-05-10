import * as React from 'react'
import WithAuthentication from './WithAuthentication'
import InvalidRoute from './InvalidRoute'
import SwipeableViews from 'react-swipeable-views'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import Container from '../presentational/FlexContainer'
import AccountCreate from '../presentational/AccountCreate'
import { connect } from 'react-redux'
import { getDefaultAccountDecrypted } from '../../store/getter'
import { createDefaultAccount } from '../action'
import { NavigationLayout } from '../presentational/MainLayout'
import { ConnectedNavigationBackButton } from './NavigationButtons'

function TabContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="tab-container" style={{ height: 460, display: 'flex' }}>
      {children}
    </div>
  )
}

const ConnectedAccountCreate = connect(
  getDefaultAccountDecrypted,
  { onClick: createDefaultAccount }
)(AccountCreate)

class AccountCreateBar extends React.PureComponent<{}, { value: number }> {
  state = {
    value: 0,
  }

  handleChange = (event, value: number) => {
    this.setState({ value })
  }

  handleChangeIndex = (index: number) => {
    this.setState({ value: index })
  }

  render() {
    return (
      <NavigationLayout
        title="创建新账户"
        renderLeft={() => <ConnectedNavigationBackButton />}
      >
        <Container justifyContent="flex-start">
          <AppBar position="static" color="default">
            <Tabs
              value={this.state.value}
              onChange={this.handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
            >
              <Tab label="创建" />
              <Tab label="导入" />
            </Tabs>
          </AppBar>
          <SwipeableViews
            containerStyle={{ display: 'flex', flex: 1 }}
            index={this.state.value}
            onChangeIndex={this.handleChangeIndex}
          >
            <TabContainer>
              <ConnectedAccountCreate />
            </TabContainer>
            <TabContainer>Here is to import an account</TabContainer>
          </SwipeableViews>
        </Container>
      </NavigationLayout>
    )
  }
}

export default () => (
  <WithAuthentication>
    {({ status }) => {
      if (status === 'password') {
        return <AccountCreateBar />
      }

      return (
        <InvalidRoute message="everiSigner needs to be unlock in order to create an Account." />
      )
    }}
  </WithAuthentication>
)