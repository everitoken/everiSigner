import * as React from "react";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { Typography, Button } from "@material-ui/core";
import Container from "../presentational/FlexContainer";
import * as PasswordService from "../../service/PasswordService";
import * as uiActions from "../action";
import { connect } from "react-redux";
import AuthProtectedView from "./AuthProtectedView";
import InvalidRoute from "./InvalidRoute";

type PropTypes = {
  setPassword: (password: string) => uiActions.UiActionTypes;
};

type StateTypes = {
  password?: string;
  passwordRepeat?: string;
  passwordConfirmed: boolean;
  showPassword: boolean;
};
class WalletCreate extends React.Component<PropTypes, StateTypes> {
  state = {
    password: null,
    passwordRepeat: null,
    passwordConfirmed: false,
    showPassword: false
  };

  handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ password: event.target.value });
  };

  handlePasswordRepeatChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      passwordRepeat: event.target.value,
      passwordConfirmed: event.target.value === this.state.password
    });
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !this.state.showPassword }));
  };

  handleSetPassword = () => {
    if (!this.state.password || !this.state.passwordRepeat) {
      return;
    }

    const { success, payload } = PasswordService.isPasswordValid(
      this.state.password,
      this.state.passwordRepeat
    );

    if (!success) {
      return;
    }

    this.props.setPassword(this.state.password);
  };

  render() {
    return (
      <Container>
        <Typography variant="h5">Create a strong password</Typography>
        <Container justifyContent="space-evenly">
          <FormControl>
            <InputLabel htmlFor="password">
              New Password (min. 8 chars)
            </InputLabel>
            <Input
              id="password"
              type={this.state.showPassword ? "text" : "password"}
              value={this.state.password || ""}
              onChange={this.handlePasswordChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Toggle password visibility"
                    onClick={this.handleClickShowPassword}
                  >
                    {this.state.showPassword ? (
                      <Visibility />
                    ) : (
                      <VisibilityOff />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="password-confirm">Confirm Password</InputLabel>
            <Input
              error={
                !this.state.passwordConfirmed &&
                this.state.password != null &&
                this.state.passwordRepeat != null
              }
              id="password-confirm"
              type={this.state.showPassword ? "text" : "password"}
              value={this.state.passwordRepeat || ""}
              onChange={this.handlePasswordRepeatChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Toggle password visibility"
                    onClick={this.handleClickShowPassword}
                  >
                    {this.state.showPassword ? (
                      <Visibility />
                    ) : (
                      <VisibilityOff />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleSetPassword}
          >
            Create wallet
          </Button>
        </Container>
      </Container>
    );
  }
}

const ConnectedComponent = connect(
  null,
  { setPassword: uiActions.setPassword }
)(WalletCreate);

export default (props: any) => (
  <AuthProtectedView>
    {({ status }) => {
      if (status === "unknown") {
        return <ConnectedComponent {...props} />;
      }

      return (
        <InvalidRoute message="Invalid state: Can't access this route with current application state." />
      );
    }}
  </AuthProtectedView>
);
