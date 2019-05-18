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
import {
  getSeedAccountDecrypted,
  getAccountImportScreen,
} from '../../store/getter'
import { createAccountWithMnemonic, importAccount } from '../action'
import { NavigationLayout } from '../presentational/MainLayout'
import { ConnectedNavigationBackButton } from './NavigationButtons'
import AccountImport from '../presentational/AccountImport'
import labels from '../../labels'
import AccountMnemonicImport from '../presentational/AccountMnemonicImport'

function TabContainer({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="tab-container"
      style={{ height: 400, display: 'flex', maxWidth: 400 }}
    >
      {children}
    </div>
  )
}

const ConnectedAccountCreate = connect(
  getSeedAccountDecrypted,
  { onClick: createAccountWithMnemonic }
)(AccountCreate)

const ConnectedAccountImport = connect(
  getAccountImportScreen,
  { onClick: importAccount }
)(AccountImport)

const ConnectedAccountMnemonicImport = connect(
  getAccountImportScreen,
  { onClick: createAccountWithMnemonic }
)(AccountMnemonicImport)

class AccountCreateBar extends React.PureComponent<{}, { value: number }> {
  state = {
    value: 0,
  }

  handleChange = (_: any, value: number) => {
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
              style={{ width: '400px' }}
              value={this.state.value}
              onChange={this.handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
            >
              <Tab label={labels.CREATE} />
              <Tab label={labels.PRIVATE_KEY_IMPORT} />
              <Tab label={labels.MNEMONIC_IMPORT} />
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
            <TabContainer>
              <ConnectedAccountImport />
            </TabContainer>
            <TabContainer>
              <ConnectedAccountMnemonicImport />
            </TabContainer>
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
