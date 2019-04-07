import * as React from 'react'
import styled from 'styled-components'
import * as style from '../../style'

const Container = styled.div`
  overflow: hidden;
  width: ${style.WINDOW_WIDTH}px;
  height: ${style.WINDOW_HEIGHT}px;
  display: flex;
  flex-direction: column;
`

export default class extends React.PureComponent {
  render() {
    return <Container>{this.props.children}</Container>
  }
}
