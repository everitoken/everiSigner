import * as React from 'react'

import { storiesOf } from '@storybook/react'
import NetworkListItem from '../src/ui/presentational/NetworkListItem'

const network = {
  name: 'mainnet1',
  url: 'https://mainnet1.everitoken.io/',
  abbr: 'HK',
  location: 'Hong Kong',
}

storiesOf('Network', module).add('simple list item', () => (
  <NetworkListItem network={network} />
))

storiesOf('Network', module).add('extended list item', () => (
  <NetworkListItem network={network} simple />
))
