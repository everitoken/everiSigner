import * as React from 'react'
import styled from 'styled-components'
import * as style from '../../style'

export type PropTypes = {
  withPadding?: boolean
  justifyContent: string
  alignItems: string
}

const FlexContainer = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  flex: 1;
  justify-content: ${(props: PropTypes) => props.justifyContent};
  align-items: ${(props: PropTypes) => props.alignItems};
  padding: ${(props: PropTypes) =>
    props.withPadding ? `${style.padding.standard}px` : '0px'};
`

class Comp extends React.PureComponent<PropTypes> {
  static defaultProps = {
    withPadding: false,
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
  }
  render() {
    return <FlexContainer {...this.props}>{this.props.children}</FlexContainer>
  }
}

export default Comp
