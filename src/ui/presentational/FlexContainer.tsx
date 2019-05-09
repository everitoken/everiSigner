import * as React from 'react'
import styled from 'styled-components'
import * as style from '../../style'

export type PropTypes = {
  withPadding?: boolean
  justifyContent: string
  alignItems: string
  alignSelf: string
  direction: 'row' | 'column'
}

const FlexContainer = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: ${(props: PropTypes) => props.direction};
  flex: 1;
  justify-content: ${(props: PropTypes) => props.justifyContent};
  align-items: ${(props: PropTypes) => props.alignItems};
  align-self: ${(props: PropTypes) => props.alignSelf};
  padding: ${(props: PropTypes) =>
    props.withPadding ? `${style.padding.standard}px` : '0px'};
`

class Comp extends React.PureComponent<PropTypes> {
  static defaultProps = {
    withPadding: false,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignSelf: 'stretch',
    direction: 'column',
  }
  render() {
    return <FlexContainer {...this.props}>{this.props.children}</FlexContainer>
  }
}

export default Comp
