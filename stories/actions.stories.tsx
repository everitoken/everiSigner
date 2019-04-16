import * as React from 'react'
import { storiesOf } from '@storybook/react'
import ActionName from '../src/ui/presentational/ActionName'
import SiteLocation from '../src/ui/presentational/SiteLocation'
import SigningMessage from '../src/ui/presentational/SigningMessage'

storiesOf('action related', module).add('action name', () => (
  <ActionName name="transferft" />
))

storiesOf('action related', module).add('site location', () => (
  <SiteLocation url="https://google.com:88" />
))

storiesOf('action related', module).add('signing message', () => (
  <SigningMessage message="this is the signing message comming with the signing request" />
))
