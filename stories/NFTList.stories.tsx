import * as React from 'react'

import { storiesOf } from '@storybook/react'
import NFTList from '../src/ui/presentational/NFTList'
import Container from '../src/ui/presentational/Container'
import { NFTType } from '../src/types'

const nfts: NFTType[] = [
  {
    domain: 'Domain 1',
    name: 'Token name 1',
  },
  {
    domain: 'Domain 2',
    name: 'Token name 2',
  },
]

storiesOf('NFTList', module).add('default', () => (
  <Container>
    <NFTList fetching={false} data={nfts} />
  </Container>
))
