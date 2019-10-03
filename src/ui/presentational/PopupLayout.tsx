import * as React from 'react'
import FlexContainer from './FlexContainer'
import ScreenHeader from './ScreenHeader'

type PropTypes = {
  title: string
  children: React.ReactNode
  bottomButtonGroup: React.ReactNode
}

function PopupLayout(props: PropTypes) {
  return (
    <FlexContainer>
      <div
        style={{
          alignSelf: 'stretch',
        }}
      >
        <ScreenHeader title={props.title} />
      </div>
      <FlexContainer alignSelf="stretch" withPadding>
        {props.children}
      </FlexContainer>
      <div style={{ alignSelf: 'stretch' }}>{props.bottomButtonGroup}</div>
    </FlexContainer>
  )
}

export default PopupLayout
