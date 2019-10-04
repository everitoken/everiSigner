import * as React from 'react'
import { NavigationLayout } from '../presentational/MainLayout'
import ConnectedNavigationBackButton from './NavigationButtons'
import FlexContainer from '../presentational/FlexContainer'

export default class extends React.PureComponent {
  render() {
    return (
      <NavigationLayout
        title="关于 everiSigner"
        renderLeft={() => <ConnectedNavigationBackButton />}
      >
        <FlexContainer justifyContent="space-between">
          <ul>
            <li>Tech stack</li>
            <li>Purpose of everiSigner</li>
            <li>Contribute, GitHub</li>
          </ul>
        </FlexContainer>
      </NavigationLayout>
    )
  }
}
