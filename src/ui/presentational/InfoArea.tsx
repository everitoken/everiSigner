import * as React from 'react'
import FlexContainer from '../presentational/FlexContainer'

type PropTypes = {
  children: React.ReactNode
}

export default class InfoArea extends React.PureComponent<PropTypes> {
  render() {
    return (
      <FlexContainer>
        <div
          style={{
            padding: '10 30',
            display: 'flex',
            alignSelf: 'stretch',
            fontFamily: 'Roboto Mono',
            backgroundColor: 'rgba(4, 56, 129, 0.4)',
          }}
        >
          {this.props.children}
        </div>
      </FlexContainer>
    )
  }
}
