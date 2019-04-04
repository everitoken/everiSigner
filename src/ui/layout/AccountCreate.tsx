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
import {
  FormControl,
  InputLabel,
  Input,
  Button,
  Chip
} from "@material-ui/core";
import AlertDialog from "../presentational/AlertDialog";
import SeedWordsDisplay from "../presentational/SeedWordsDisplay";

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
  modalState: boolean;
};

class AccountCreate extends React.PureComponent<
  AccountCreatePropTypes,
  AccountCreateStateTypes
> {
  state = {
    account: "Untitled account",
    invalid: false,
    modalState: false
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

    if (!isValid) {
      this.setState({ invalid: true });
      return;
    }

    this.setState({ modalState: true, invalid: false }, () => {
      this.props.onClick(this.state.account);
    });
  };
  handleModalClose = () => {
    this.setState({ modalState: false });
  };
  render() {
    return (
      <React.Fragment>
        <AlertDialog
          title="Account Seed"
          open={this.state.modalState}
          onClose={this.handleModalClose}
        >
          <Typography component="p" variant="body1">
            Seed phrases for you account, please keep it safe.
          </Typography>
          <hr />
          <SeedWordsDisplay words="Seed phrases for you account, please keep it safe" />
        </AlertDialog>
        <Container justifyContent="space-around">
          <Typography component="p" color="textSecondary">
            Specify an account name that is descriptive and easy to remember. It
            can not exceed 25 characters.
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
      </React.Fragment>
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
