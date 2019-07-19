import * as React from 'react'
import FlexContainer from '../presentational/FlexContainer'

type PropTypes = {
  children: React.ReactNode
}

export default function InfoArea(props: PropTypes) {
  return (
    <FlexContainer>
      <div
        style={{
          padding: '10 30',
          display: 'flex',
          alignSelf: 'stretch',
          fontFamily: 'Roboto Mono',
          backgroundColor: 'rgba(4, 56, 129, 0.2)',
        }}
      >
        {props.children}
      </div>
    </FlexContainer>
  )
}
