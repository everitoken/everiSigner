import * as React from 'react'

import { storiesOf } from '@storybook/react'
import AccountListItem from '../src/ui/presentational/AccountListItem'
import AccountSelect from '../src/ui/presentational/AccountSelect'
import * as fixture from '../src/fixture'
import { Button } from '@material-ui/core'

const account = fixture.accounts.validDefaultDecrypted
const account1 = fixture.accounts.validDefaultEncrypted
const importedAccount: typeof account = {
  ...account1,
  type: 'imported',
}
const accounts = [account, importedAccount]

storiesOf('Account', module).add('default account', () => (
  <AccountListItem account={account} />
))
storiesOf('Account', module).add('truncate len', () => (
  <AccountListItem account={account} truncateLen={15} />
))

storiesOf('Account', module).add('imported account', () => (
  <AccountListItem account={importedAccount} />
))

storiesOf('Account', module).add('select', () => (
  <AccountSelect selected={account} onSelect={() => null} accounts={accounts}>
    {({ handleOpen }) => {
      return <Button onClick={handleOpen}>Show Dialog</Button>
    }}
  </AccountSelect>
))
