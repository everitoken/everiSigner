import * as React from 'react'

import { storiesOf } from '@storybook/react'
import SeedWordsDisplay from '../src/ui/presentational/SeedWordsDisplay'

storiesOf('SeedWordsDisplay', module).add('default', () => (
  <SeedWordsDisplay words="everitoken everisigner seed list" />
))
