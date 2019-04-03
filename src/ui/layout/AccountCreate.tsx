import * as React from "react";
import AuthProtectedView from "./AuthProtectedView";
import InvalidRoute from "./InvalidRoute";
import SwipeableViews from "react-swipeable-views";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";

import Container from "../presentational/FlexContainer";
import { padding } from "../../style";
import { FormControl, InputLabel, Input, Button } from "@material-ui/core";

function TabContainer({ children }) {
  return (
    <Typography
      component="div"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: 300,
        padding: padding.standard / 2
      }}
    >
      {children}
    </Typography>
  );
}

type AccountCreatePropTypes = {
  onClick: (account: string) => any;
};

type AccountCreateStateTypes = {
  account: string;
  invalid: boolean;
};

class AccountCreate extends React.PureComponent<
  AccountCreatePropTypes,
  AccountCreateStateTypes
> {
  state = {
    account: "Untitled account",
    invalid: false
  };
  handleAccountChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    this.setState({ account: value });
  };
  isValid = () => {
    if (this.state.account.length === 0 || this.state.account.length > 25) {
      return false;
    }

    return true;
  };
  handleOnCreate = () => {
    const isValid = this.isValid();
    this.setState({ invalid: !isValid });

    if (!isValid) {
      return;
    }

    this.props.onClick(this.state.account);
  };
  render() {
    return (
      <Container justifyContent="space-around">
        <Typography component="p" color="textSecondary">
          Some insight about the meaning of creating an account.
        </Typography>
        <FormControl>
          <InputLabel htmlFor="account-name">
            Specify account name (less than 25 chars)
          </InputLabel>
          <Input
            autoFocus
            error={this.state.invalid}
            id="account-name"
            value={this.state.account}
            onChange={this.handleAccountChange}
          />
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={this.handleOnCreate}
        >
          Create Account
        </Button>
      </Container>
    );
  }
}

class AccountCreateBar extends React.PureComponent {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    return (
      <Container justifyContent="flex-start">
        <div style={{ paddingBottom: padding.standard * 2 }}>
          <Typography variant="h4">Create Account</Typography>
        </div>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="Create" />
            <Tab label="Import" />
          </Tabs>
        </AppBar>
        <SwipeableViews
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer>
            <AccountCreate onClick={accountName => alert(accountName)} />
          </TabContainer>
          <TabContainer>Here is to import an account</TabContainer>
        </SwipeableViews>
      </Container>
    );
  }
}

export default () => (
  <AuthProtectedView>
    {({ status }) => {
      if (status === "password") {
        return <AccountCreateBar />;
      }

      return (
        <InvalidRoute message="everiSigner needs to be unlock in order to create an Account." />
      );
    }}
  </AuthProtectedView>
);
