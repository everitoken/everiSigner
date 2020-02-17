import * as React from 'react'

import { storiesOf } from '@storybook/react'
import SeedWordsDisplay from '../src/ui/presentational/SeedWordsDisplay'
import SuccessInfoLayout from '../src/ui/presentational/SuccessInfoLayout'
import CustomListItem from '../src/ui/presentational/CustomListItem'
import { Button, Grid, IconButton, List, ListItemText } from '@material-ui/core'
import MonospaceText from '../src/ui/presentational/MonospaceText'
import PasswordProtectedView from '../src/ui/presentational/PasswordProtectedView'
import MenuIcon from '@material-ui/icons/Menu'
import Container from '../src/ui/presentational/Container'
import FlexContainer from '../src/ui/presentational/FlexContainer'
import AccountAvatar from '../src/ui/presentational/AccountAvatar'
import CircularEntity from '../src/ui/presentational/CircularEntity'
import Divider from '../src/ui/presentational/Divider'
import InfoIcon from '@material-ui/icons/Info'

import * as fixture from '../src/fixture'

storiesOf('SeedWordsDisplay', module).add('default', () => (
  <SeedWordsDisplay words="everitoken everisigner seed list" />
))

storiesOf('Success container', module).add('default', () => (
  <div style={{ width: 200, height: 200, flex: 1, display: 'flex' }}>
    <SuccessInfoLayout>
      <MonospaceText>Account is successfully created</MonospaceText>
      <Button variant="outlined" color="primary">
        Go to Account
      </Button>
    </SuccessInfoLayout>
  </div>
))

storiesOf('Password protected view', module).add('default', () => (
  <PasswordProtectedView password="test">
    {({ password }) => <p>{password}</p>}
  </PasswordProtectedView>
))

const account = fixture.accounts.validDefaultDecrypted

storiesOf('Home', module).add('default', () => (
  <Container>
    <FlexContainer>
      <Grid container spacing={8} justify="space-between">
        <Grid item xs={2}>
          <IconButton onClick={() => null}>
            <MenuIcon />
          </IconButton>
        </Grid>
        <Grid item justify="center" style={{ alignSelf: 'center' }}>
          <AccountAvatar account={account} onClick={() => alert('fei')} />
        </Grid>
        <Grid item justify="center" xs={2} />
        <Divider />
      </Grid>
      <p>some other content</p>
    </FlexContainer>
  </Container>
))

storiesOf('AccountDetail', module).add('default', () => (
  <Container>
    <FlexContainer>
      <CircularEntity title={account.name} subtitle={account.publicKey} />
      <Divider margin="8px 0 0 0" />
      <List style={{ width: '100%' }}>
        <CustomListItem onClick={() => alert('whatnot')} LeftIcon={InfoIcon}>
          <ListItemText primary="First" secondary="second" />
        </CustomListItem>
      </List>
    </FlexContainer>
  </Container>
))
