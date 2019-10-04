import * as React from 'react'
import { NavigationLayout } from '../presentational/MainLayout'
import ConnectedNavigationBackButton from './NavigationButtons'
import FlexContainer from '../presentational/FlexContainer'

export default class extends React.PureComponent {
  render() {
    return (
      <NavigationLayout
        title="导入钱包"
        renderLeft={() => <ConnectedNavigationBackButton />}
      >
        <FlexContainer>
          <p>Import a wallet screen</p>
        </FlexContainer>
      </NavigationLayout>
    )
  }
}
