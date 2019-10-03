import * as React from 'react'
import * as style from '../../style'
import styled from 'styled-components'

type PropTypes = {
  title: string
  withBackgroundColor?: boolean
}

const Container = styled.p`
  text-align: center;
  width: 100%;
  font-size: 21px;
  font-weight: bold;
  font-family: 'Open Sans';
  padding: 20px 0;
  margin: 0;
  background-color: ${(props: { withBackgroundColor: boolean }) => {
    return props.withBackgroundColor ? '#ececec' : 'transparent'
  }};
  color: ${style.colors.headerPrimary};
`

// TODO: check validity
export default function ScreenHeader(props: PropTypes) {
  const withBackgroundColor =
    props.withBackgroundColor === undefined ? true : !!props.withBackgroundColor

  return (
    <Container withBackgroundColor={withBackgroundColor}>
      {props.title}
    </Container>
  )
}
