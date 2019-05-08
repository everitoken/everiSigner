import * as React from 'react'

import { storiesOf } from '@storybook/react'
import MainLayout, {
  HeaderTitle,
  TopActionBar,
} from '../src/ui/presentational/MainLayout'
import Container from '../src/ui/presentational/Container'
import NetworkSelect from '../src/ui/presentational/NetworkSelect'

storiesOf('Layout', module).add('with text header', () => (
  <Container>
    <MainLayout renderHead={() => <HeaderTitle title="Main layout head" />}>
      <p>Body</p>
    </MainLayout>
  </Container>
))

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
storiesOf('Layout', module).add('main header', () => (
  <Container>
    <MainLayout
      renderHead={() => (
        <TopActionBar
          renderMiddle={() => (
            <NetworkSelect
              selected={network1}
              onSelect={() => null}
              networks={networks}
            />
          )}
        />
      )}
    >
      <p>Body</p>
    </MainLayout>
  </Container>
))
