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
  font-size: 20px;
  font-weight: bold;
  font-family: 'Open Sans';
  padding: 20px 0;
  margin: 0;
  background-color: ${(props: { withBackgroundColor: boolean }) => {
    return props.withBackgroundColor ? '#ececec' : 'transparent'
  }};
  color: ${style.colors.headerPrimary};
`

export default class ScreenHeader extends React.PureComponent<PropTypes> {
  static defaultProps = {
    withBackgroundColor: true,
  }
  render() {
    return (
      <Container withBackgroundColor={!!this.props.withBackgroundColor}>
        {this.props.title}
      </Container>
    )
  }
}
