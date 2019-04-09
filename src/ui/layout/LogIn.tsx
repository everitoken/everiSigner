import * as React from 'react'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import { connect } from 'react-redux'
import {
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
  Button,
  Typography,
} from '@material-ui/core'

import * as uiActions from '../action'
import { mapInputPassword } from '../../store/getter'
import { verifyPassword } from '../../service/PasswordService'
import { Logo } from '../presentational/Logo'

type PropTypes = {
  passwordHash: string
  onUnlock: typeof uiActions.logIn
}

type StateTypes = {
  invalid: boolean
  password: string
  showPassword: boolean
}

class Login extends React.PureComponent<PropTypes, StateTypes> {
  state = {
    invalid: false,
    password: '',
    showPassword: false,
  }
  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword })
  }
  handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ password: event.target.value })
  }
  onUnlock = () => {
    const isPasswordValid = verifyPassword(
      this.state.password,
      this.props.passwordHash
    )
    this.setState({ invalid: !isPasswordValid })

    if (isPasswordValid) {
      this.props.onUnlock(this.state.password)
    }
  }
  render() {
    return (
      <React.Fragment>
        <div>
          <Logo />
          <Typography variant="h6" align="center" color="textSecondary">
            WELCOME BACK
          </Typography>
        </div>
        <FormControl>
          <InputLabel htmlFor="password">Type password to unlock...</InputLabel>
          <Input
            error={this.state.invalid}
            id="password"
            type={this.state.showPassword ? 'text' : 'password'}
            value={this.state.password || ''}
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
    )
  }
}
const connector = connect(
  mapInputPassword,
  { onUnlock: uiActions.logIn }
)

export default connector(Login)
