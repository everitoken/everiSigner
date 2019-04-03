import * as React from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import { WithRouterType } from "../../types";
import logo from "../../assets/logo@2x.png";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";

export type PropTypes = {} & WithRouterType;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  flex: 1;
`;

class WalletDecision extends React.PureComponent<PropTypes> {
  render() {
    const { history } = this.props;

    return (
      <Container>
        <img
          src={logo}
          alt="logo"
          style={{ width: "8rem", alignSelf: "center", padding: 10 }}
        />
        <Card>
          <CardContent>
            <Typography variant="h5" component="h2">
              Import a wallet
            </Typography>
            <Typography component="p">
              Import your existing wallet using a 12 word seed phrase. Lorem
              ipsum dolor sit amet consectetur adipisicing elit. Eum quos
              laboriosam asperiores, quibusdam alias id maiores error beatae.
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => history.push("/wallet-import")}
            >
              Import wallet
            </Button>
          </CardActions>
        </Card>
        <Card>
          <CardContent>
            <Typography variant="h5" component="h2">
              Create a wallet
            </Typography>
            <Typography component="p">
              This will create a new wallet and seed phrase and multiple Evt
              accounts can be created.
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              color="primary"
              onClick={() => history.push("/wallet-create")}
            >
              Create wallet
            </Button>
          </CardActions>
        </Card>
      </Container>
    );
  }
}

export default withRouter(WalletDecision);
