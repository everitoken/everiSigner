import * as React from 'react'
import FlexContainer from '../src/ui/presentational/FlexContainer'
import { Button, Typography } from '@material-ui/core'

import { storiesOf } from '@storybook/react'

storiesOf('Signing', module).add('layout', () => (
  <div
    style={{
      height: '500px',
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
    }}
  >
    <FlexContainer withPadding justifyContent="space-between">
      <div style={{ alignItems: 'center', alignSelf: 'center' }}>
        <Typography variant="h4">Signing Request</Typography>
      </div>
      <pre>
        ` "from": publicKey, // sender "to":
        "EVTxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", // receiver
        "number": "10.00000 S#1", // S#1 means the No 1 fungible token (EVT
        token) "memo": "Test" // Comment or extra data `
      </pre>
      <span />
      <p style={{ overflowWrap: 'break-word' }}>Signed: "Some signature"</p>
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={this.handleClick}
      >
        Sign
      </Button>
    </FlexContainer>
  </div>
))
