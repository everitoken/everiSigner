import * as React from 'react'

import { storiesOf } from '@storybook/react'
import StakeShare from '../src/ui/presentational/StakeShare'
import { NavigationLayout } from '../src/ui/presentational/MainLayout'

const shares = [
  {
    validator: 'HashQuark',
    units: 17,
    net_value: '1.029636774045',
    time: '2020-02-16T14:10:38',
    type: 'active',
    fixed_days: 0,
  },
  {
    validator: 'HashQuark',
    units: 97,
    net_value: '1.029636774045',
    time: '2020-02-16T14:17:44',
    type: 'active',
    fixed_days: 0,
  },
]

storiesOf('StakeShare', module).add('Staking shares', () => (
  <StakeShare shares={shares} title="Staking Shares" />
))

const available = 970000000
storiesOf('StakeShare', module).add('Staking shares', () => (
  <NavigationLayout
    title="Stacking Overview"
    renderLeft={() => <span>placeholder</span>}
  >
    <div>
      <p
        className="everitoken-mono"
        style={{ margin: 0, padding: 10, fontSize: 12 }}
      >
        Amount available for Staking: {available / 10000}
      </p>
    </div>
  </NavigationLayout>
))
