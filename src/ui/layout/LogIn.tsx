import * as React from "react";
import {
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
  Button,
  Typography
} from "@material-ui/core";

import logo from "../../assets/logo@2x.png";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { connect } from "react-redux";
import * as uiActions from "../action";
import { mapInputPassword } from "../../store/getter";
import { verifyPassword } from "../../service/PasswordService";

type PropTypes = {
  passwordHash: string;
  onUnlock: (password: string) => uiActions.LogIn;
};
type StateProps = {
  invalid: boolean;
  password: string;
  showPassword: boolean;
};
class Login extends React.PureComponent<PropTypes, StateProps> {
  state = {
    invalid: false,
    password: "",
    showPassword: false
  };
  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !this.state.showPassword }));
  };
  handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ password: event.target.value });
  };
  onUnlock = () => {
    const isPasswordValid = verifyPassword(
      this.state.password,
      this.props.passwordHash
    );
    this.setState({ invalid: !isPasswordValid });

    if (isPasswordValid) {
      this.props.onUnlock(this.state.password);
    }
  };
  render() {
    return (
      <React.Fragment>
        <img
          src={logo}
          alt="logo"
          style={{ width: "15rem", alignSelf: "center", padding: 10 }}
        />
        <Typography variant="h6" align="center" color="textSecondary">
          WELCOME BACK
        </Typography>
        <FormControl>
          <InputLabel htmlFor="password">Type password to unlock...</InputLabel>
          <Input
            error={this.state.invalid}
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
                  {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={this.onUnlock}
        >
          UNLOCK
        </Button>
      </React.Fragment>
    );
  }
}
const connector = connect(
  mapInputPassword,
  { onUnlock: uiActions.logIn }
);

export default connector(Login);
