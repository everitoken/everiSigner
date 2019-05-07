import * as React from 'react'
import Container from '../src/ui/presentational/Container'
import FlexContainer from '../src/ui/presentational/FlexContainer'
import * as fixture from '../src/fixture'

import { storiesOf } from '@storybook/react'
import BottomButtonGroup from '../src/ui/presentational/BottomButtonGroup'
import CircularEntity from '../src/ui/presentational/CircularEntity'
import ConnectedEntities from '../src/ui/presentational/ConnectedEntities'
import ScreenHeader from '../src/ui/presentational/ScreenHeader'
import { Grid, Typography } from '@material-ui/core'

const account = fixture.accounts.validDefaultDecrypted
const account1 = fixture.accounts.validDefaultEncrypted
const importedAccount: typeof account = {
  ...account1,
  type: 'imported',
}
const accounts = [account, importedAccount]

storiesOf('Account request', module).add('layout', () => {
  const left = (
    <CircularEntity title="demo page with long text" subtitle="required" />
  )
  const right = (
    <CircularEntity title="demo page" subtitle="https://google.de" />
  )

  return (
    <Container>
      <FlexContainer alignItems="center">
        <div
          style={{
            display: 'flex',
            flex: 1,
            alignSelf: 'stretch',
            margin: '0 0 3rem 0',
          }}
        >
          <ScreenHeader title="Connect Request" />
        </div>

        <Grid container xs={12} spacing={0} justify="center">
          <Grid item xs={11}>
            <ConnectedEntities left={left} right={right} />
          </Grid>
          <Grid item xs={11} alignContent="flex-start">
            <Typography variant="headline" align="center" gutterBottom>
              Test website would like to connect to your account
            </Typography>
            <Typography variant="caption" gutterBottom>
              This site is requesting access to view your current account
              address. Always make sure you trust the sites you are interacting.
            </Typography>
            <Typography variant="caption">
              By clicking{' '}
              <Typography variant="caption" color="primary" inline>
                AUTHORIZE
              </Typography>{' '}
              the site will only see the <b>account name</b> and <b>address</b>.
            </Typography>
          </Grid>
        </Grid>

        <BottomButtonGroup
          onPrimaryButtonClick={() => alert('primary')}
          onSecondaryButtonClick={() => alert('secondary')}
        />
      </FlexContainer>
    </Container>
  )
})
