import * as React from 'react'
import Container from '../src/ui/presentational/Container'
import AccountSelect from '../src/ui/layout/AccountSelect'
import FlexContainer from '../src/ui/presentational/FlexContainer'
import * as fixture from '../src/fixture'

import { storiesOf } from '@storybook/react'
import {
  Button,
  Typography,
  FormControl,
  FormLabel,
  FormHelperText,
} from '@material-ui/core'
import AccountSelectList from '../src/ui/presentational/AccountSelectList'
import SiteLocation from '../src/ui/presentational/SiteLocation'

const account = fixture.accounts.validDefaultDecrypted
const account1 = fixture.accounts.validDefaultEncrypted
const importedAccount: typeof account = {
  ...account1,
  type: 'imported',
}
const accounts = [account, importedAccount]

storiesOf('Account request', module).add('layout', () => (
  <Container>
    <FlexContainer justifyContent="flex-start">
      <div>
        <Typography variant="h4">
          Request to access your account data
        </Typography>
      </div>
      <div
        style={{
          display: 'flex',
          flex: 1,
          padding: '10px 0',
          overflow: 'scroll',
          flexDirection: 'column',
        }}
      >
        <div style={{ marginBottom: '20px' }}>
          {<SiteLocation url="https://google.com:88" />}
          is requesting to access your account information.
        </div>
        <div>
          <div
            style={{
              maxHeight: '290px',
              overflow: 'scroll',
            }}
          >
            <AccountSelectList
              accounts={accounts}
              selected={account}
              onSelect={() => null}
            />
          </div>
          <div style={{ padding: '10px 0' }}>
            <FormHelperText>
              * Only <b>Account name</b> and <b>Public key</b> will become
              available to the website.
            </FormHelperText>
          </div>
        </div>
      </div>
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={() => alert('authorize')}
      >
        Authorize
      </Button>
    </FlexContainer>
  </Container>
))
