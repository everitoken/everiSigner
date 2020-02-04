import * as React from 'react'
import InvalidRoute from './InvalidRoute'
import SwipeableViews from 'react-swipeable-views'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import Container from '../presentational/FlexContainer'
import AccountCreatePresentational from '../presentational/AccountCreate'
import { connect } from 'react-redux'
import {
  getSeedAccountDecrypted,
  getAccountImportScreen,
} from '../../store/getter'
import { createAccountWithMnemonic, importAccount } from '../action'
import AccountImport from '../presentational/AccountImport'
import AccountMnemonicImport from '../presentational/AccountMnemonicImport'
import useAuthenticationState from '../../hooks/useAuthenticationState'
import { useTranslation } from 'react-i18next'

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

const ConnectedAccountCreate = connect(getSeedAccountDecrypted, {
  onClick: createAccountWithMnemonic,
})(AccountCreatePresentational)

const ConnectedAccountImport = connect(getAccountImportScreen, {
  onClick: importAccount,
})(AccountImport)

const ConnectedAccountMnemonicImport = connect(getAccountImportScreen, {
  onClick: createAccountWithMnemonic,
})(AccountMnemonicImport)

function AccountCreate() {
  const [value, setValue] = React.useState(0)
  const [authenticationState] = useAuthenticationState()
  const { t } = useTranslation()

  if (authenticationState !== 'password') {
    return (
      <InvalidRoute message="everiSigner needs to be unlock in order to create an Account." />
    )
  }

  function handleChange(_: any, value: number) {
    setValue(value)
  }

  function handleChangeIndex(index: number) {
    setValue(index)
  }

  return (
    <Container justifyContent="flex-start">
      <AppBar position="static" color="default">
        <Tabs
          style={{ width: '400px' }}
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label={t('CREATE')} />
          <Tab label={t('PRIVATE_KEY_IMPORT')} />
          <Tab label={t('MNEMONIC_IMPORT')} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        containerStyle={{ display: 'flex', flex: 1 }}
        index={value}
        onChangeIndex={handleChangeIndex}
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
  )
}

export default AccountCreate
