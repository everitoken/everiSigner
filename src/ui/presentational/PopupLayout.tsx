import * as React from 'react'
import FlexContainer from './FlexContainer'
import ScreenHeader from './ScreenHeader'

type PropTypes = {
  title: string
  children: React.ReactNode
  bottomButtonGroup: React.ReactNode
}

class PopupLayout extends React.PureComponent<PropTypes> {
  render() {
    return (
      <FlexContainer>
        <div
          style={{
            alignSelf: 'stretch',
          }}
        >
          <ScreenHeader title={this.props.title} />
        </div>
        <FlexContainer alignSelf="stretch" withPadding>
          {this.props.children}
        </FlexContainer>
        <div style={{ alignSelf: 'stretch' }}>
          {this.props.bottomButtonGroup}
        </div>
      </FlexContainer>
    )
  }
}

export default PopupLayout
