import * as React from 'react'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import FlexContainer from '../presentational/FlexContainer'
import { connect } from 'react-redux'
import {
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
} from '@material-ui/core'
import Button from '../presentational/InlineButton'

import * as uiActions from '../action'
import { mapInputPassword } from '../../store/getter'
import { verifyPassword } from '../../service/PasswordService'
import Logo from '../presentational/Logo'
import ScreenHeader from '../presentational/ScreenHeader'
import labels from '../../labels'

type PropTypes = {
  message: string
  passwordHash: string | undefined
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

  handleKeyUp = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      this.onUnlock()
    }
  }

  onUnlock = () => {
    const isPasswordValid =
      this.props.passwordHash != null &&
      verifyPassword(this.state.password, this.props.passwordHash)

    this.setState({ invalid: !isPasswordValid })

    if (isPasswordValid) {
      this.props.onUnlock(this.state.password)
    }
  }
  render() {
    return (
      <FlexContainer withPadding alignItems="center">
        <FlexContainer justifyContent="space-around">
          <Logo />
          <FlexContainer justifyContent="center" alignItems="center">
            <ScreenHeader
              title={this.props.message}
              withBackgroundColor={false}
            />
            <FormControl style={{ width: '90%' }}>
              <InputLabel htmlFor="password">
                {labels.TYPE_PASSWORD_TO_UNLOCK}
              </InputLabel>
              <Input
                error={this.state.invalid}
                id="password"
                autoFocus
                type={this.state.showPassword ? 'text' : 'password'}
                value={this.state.password || ''}
                onChange={this.handlePasswordChange}
                onKeyUp={this.handleKeyUp}
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
          </FlexContainer>
        </FlexContainer>
        <Button
          variant="contained"
          color="primary"
          disabled={this.state.password.length === 0}
          size="large"
          onClick={this.onUnlock}
        >
          {labels.UNLOCK}
        </Button>
      </FlexContainer>
    )
  }
}
export default connect(
  mapInputPassword,
  { onUnlock: uiActions.logIn }
)(Login)
