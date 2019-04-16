import * as React from 'react'
import { storiesOf } from '@storybook/react'
import ActionName from '../src/ui/presentational/ActionName'
import SiteLocation from '../src/ui/presentational/SiteLocation'
import SigningMessage from '../src/ui/presentational/SigningMessage'
import Address from '../src/ui/presentational/Address'

storiesOf('action related', module).add('action name', () => (
  <ActionName name="transferft" />
))

storiesOf('action related', module).add('site location', () => (
  <SiteLocation url="https://google.com:88" />
))

storiesOf('action related', module).add('signing message', () => (
  <SigningMessage message="this is the signing message comming with the signing request" />
))

storiesOf('action related', module).add('Address', () => (
  <React.Fragment>
    <Address
      type="from"
      address="EVT6Qz3wuRjyN6gaU3P3XRxpnEZnM4oPxortemaWDwFRvsv2FxgND"
    />
    <Address
      type="to"
      address="EVT6Qz3wuRjyN6gaU3P3XRxpnEZnM4oPxortemaWDwFRvsv2FxgND"
    />
    <Address
      type="address"
      address="EVT6Qz3wuRjyN6gaU3P3XRxpnEZnM4oPxortemaWDwFRvsv2FxgND"
    />
    <Address
      type="payer"
      address="EVT6Qz3wuRjyN6gaU3P3XRxpnEZnM4oPxortemaWDwFRvsv2FxgND"
    />
  </React.Fragment>
))
