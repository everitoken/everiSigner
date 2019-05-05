import * as React from 'react'
import Container from '../src/ui/presentational/Container'
import ScreenTitle from '../src/ui/presentational/ScreenTitle'
import FlexContainer from '../src/ui/presentational/FlexContainer'
import * as fixture from '../src/fixture'
import Button from '../src/ui/presentational/InlineButton'

import { storiesOf } from '@storybook/react'
import { FormHelperText, Grid, Divider, Typography } from '@material-ui/core'
import AccountSelectList from '../src/ui/presentational/AccountSelectList'
import SiteLocation from '../src/ui/presentational/SiteLocation'
import CircularEntity from '../src/ui/presentational/CircularEntity'
import ConnectedEntities from '../src/ui/presentational/ConnectedEntities'
import ScreenHeader from '../src/ui/presentational/ScreenHeader'

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
        <div style={{ margin: '0 0 3rem 0', width: '100%' }}>
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

        <Grid container spacing={16}>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="outlined"
              color="secondary"
              size="large"
              onClick={this.handleClick}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={this.handleClick}
            >
              Authorize
            </Button>
          </Grid>
        </Grid>
      </FlexContainer>
    </Container>
  )
})
