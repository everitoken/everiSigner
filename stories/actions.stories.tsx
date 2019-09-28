import * as React from 'react'
import { storiesOf } from '@storybook/react'
import Container from '../src/ui/presentational/Container'
import FlexContainer from '../src/ui/presentational/FlexContainer'
import ActionPanel from '../src/ui/presentational/ActionPanel'
import Address from '../src/ui/presentational/Address'

const action = {
  actionName: 'transferft',
  abi: {
    from: 'EVT6Qz3wuRjyN6gaU3P3XRxpnEZnM4oPxortemaWDwFRvsv2FxgND',
    to: 'EVT6rn1vVAM8FfdT43Ast37yHqwRhoZkLpbxZXEtodJLYFFGA7Qzq',
    number: '10.00000 S#20',
    memo: 'Test',
  },
}

const action1 = {
  actionName: 'transferft1',
  abi: {
    from: 'EVT6Qz3wuRjyN6gaU3P3XRxpnEZnM4oPxortemaWDwFRvsv2FxgND',
    to: 'EVT6rn1vVAM8FfdT43Ast37yHqwRhoZkLpbxZXEtodJLYFFGA7Qzq',
    number: '10.00000 S#20',
    memo: 'Test',
  },
}

storiesOf('action related', module).add('panel', () => (
  <Container>
    <FlexContainer withPadding>
      <ActionPanel action={action} />
      <ActionPanel action={action1} />
    </FlexContainer>
  </Container>
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
