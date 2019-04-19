import * as React from 'react'

import { storiesOf } from '@storybook/react'
import NetworkListItem from '../src/ui/presentational/NetworkListItem'
import NetworkSelect from '../src/ui/presentational/NetworkSelect'

const network1 = {
  name: 'mainnet1',
  url: 'https://mainnet1.everitoken.io/',
  abbr: 'HK',
  location: 'Hong Kong',
}

const network2 = {
  name: 'mainnet2',
  url: 'https://mainnet2.everitoken.io/',
  abbr: 'CA',
  location: 'California',
}

const network3 = {
  name: 'mainnet3',
  url: 'https://mainnet3.everitoken.io/',
  abbr: 'TYO',
  location: 'Tokyo',
}

const network4 = {
  name: 'mainnet4',
  url: 'https://mainnet4.everitoken.io/',
  abbr: 'FRA',
  location: 'Frankfurt',
}
const network5 = {
  name: 'mainnet5',
  url: 'https://mainnet5.everitoken.io/',
  abbr: 'SEL',
  location: 'Seoul',
}
const network6 = {
  name: 'mainnet6',
  url: 'https://mainnet6.everitoken.io/',
  abbr: 'BR',
  location: 'Brazil',
}

const networks = [network1, network2, network3, network4, network5, network6]

storiesOf('Network', module).add('simple list item', () => (
  <NetworkListItem network={network1} simple />
))

storiesOf('Network', module).add('extended list item', () => (
  <NetworkListItem network={network1} />
))

storiesOf('Network', module).add('select', () => (
  <NetworkSelect
    selected={network1}
    onSelect={() => null}
    networks={networks}
  />
))
