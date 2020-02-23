import * as React from 'react'

import { storiesOf } from '@storybook/react'
import ValidatorItem from '../src/ui/presentational/ValidatorItem'

const validator = {
  name: 'HashQuark',
  current_net_value: '1.029657554433',
  total_units: 11415172,
  commission: '0.1',
}

storiesOf('ValidatorItem', module).add('a validator', () => (
  <ValidatorItem validator={validator} />
))

storiesOf('ValidatorItem', module).add('compact', () => (
  <ValidatorItem validator={validator} compact={true} />
))
