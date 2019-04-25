import * as React from 'react'
import FlexContainer from '../src/ui/presentational/FlexContainer'
import { Typography, Grid, Divider } from '@material-ui/core'
import Container from '../src/ui/presentational/Container'
import ScreenHeader from '../src/ui/presentational/ScreenHeader'
import Button from '../src/ui/presentational/InlineButton'
import * as style from '../src/style'

import { storiesOf } from '@storybook/react'

storiesOf('Signature request', module).add('layout', () => (
  <Container>
    <FlexContainer justifyContent="space-between">
      <ScreenHeader title="Signature Request" />
      <div
        style={{
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}
      >
        <div>Account placeholder</div>
        <p style={{ fontSize: '16px', width: '50%', textAlign: 'center' }}>
          Your signature is being requested
        </p>
      </div>

      <Grid container>
        <Grid item xs={12}>
          <p
            style={{
              textAlign: 'center',
              color: style.colors.headerPrimary,
              fontSize: '13px',
              fontFamily: 'monospace',
            }}
          >
            You are signing the following
          </p>
          <Divider />
        </Grid>
      </Grid>
      <div style={{ height: '35%', overflow: 'scroll' }}>
        <p style={{ overflowWrap: 'break-word' }}>Signed: {null}</p>
        <p style={{ overflowWrap: 'break-word' }}>Signed: {null}</p>
        <p style={{ overflowWrap: 'break-word' }}>Signed: {null}</p>
        <p style={{ overflowWrap: 'break-word' }}>Signed: {null}</p>
        <p style={{ overflowWrap: 'break-word' }}>Signed: {null}</p>
        <p style={{ overflowWrap: 'break-word' }}>Signed: {null}</p>
        <p style={{ overflowWrap: 'break-word' }}>Signed: {null}</p>
        <p style={{ overflowWrap: 'break-word' }}>Signed: {null}</p>
        <p style={{ overflowWrap: 'break-word' }}>Signed: {null}</p>
      </div>
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
            variant="outlined"
            color="primary"
            size="large"
            onClick={this.handleClick}
          >
            Sign
          </Button>
        </Grid>
      </Grid>
    </FlexContainer>
  </Container>
))
