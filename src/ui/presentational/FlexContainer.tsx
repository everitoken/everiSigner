import * as React from "react";
import styled from "styled-components";
import * as style from "../../style";

export type PropTypes = {
  withPadding?: boolean;
};

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: ${(props: PropTypes) =>
    props.withPadding ? `${style.padding.standard}px` : "0px"};
`;

class Comp extends React.PureComponent<PropTypes> {
  static defaultProps = { withPadding: false };
  render() {
    return <FlexContainer {...this.props}>{this.props.children}</FlexContainer>;
  }
}

export default Comp;
