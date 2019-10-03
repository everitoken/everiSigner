import * as React from 'react'
import styled from 'styled-components'
import * as style from '../../style'

const StyledContainer = styled.div`
  overflow: hidden;
  width: ${style.WINDOW_WIDTH}px;
  height: ${style.WINDOW_HEIGHT}px;
  display: flex;
  flex-direction: column;
`

export default function Container(props: {children: React.ReactNode}) {
  return <StyledContainer>{props.children}</StyledContainer>
}
