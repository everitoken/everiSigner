import * as React from "react";
import Dom from "react-dom";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import "./main.css";
import { WINDOW_HEIGHT, WINDOW_WIDTH, padding } from "./style";

interface PropTypes {
  msg: string;
}

const Container = styled.div`
  overflow: hidden;
  width: ${WINDOW_WIDTH}px;
  height: ${WINDOW_HEIGHT}px;
  padding: ${padding.standard}px;
  box-sizing: border-box;
`;

const App = (props: PropTypes) => (
  <Container>
    <Button variant="contained" color="primary">
      Hello
    </Button>
    <p>Parcel browser extension in typescript {props.msg}</p>
  </Container>
);

export default (): void => {
  Dom.render(<App msg="should work" />, document.getElementById("app"));
};
