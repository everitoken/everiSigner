import * as React from 'react'
import { storiesOf } from '@storybook/react'
import ActionName from '../src/ui/presentational/ActionName'

storiesOf('ActionName', module).add('transferft', () => (
  <ActionName name="transferft" />
))
