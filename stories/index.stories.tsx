import * as React from 'react'

import { storiesOf } from '@storybook/react'
import SeedWordsDisplay from '../src/ui/presentational/SeedWordsDisplay'
import SuccessInfoLayout from '../src/ui/presentational/SuccessInfoLayout'
import { Button } from '@material-ui/core'
import MonospaceText from '../src/ui/presentational/MonospaceText'

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
