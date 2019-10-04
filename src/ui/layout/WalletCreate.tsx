import * as React from 'react'
import IconButton from '@material-ui/core/IconButton'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormControl from '@material-ui/core/FormControl'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import * as PasswordService from '../../service/PasswordService'
import * as uiActions from '../action'
import { connect } from 'react-redux'
import AuthProtectedView from './WithAuthentication'
import InvalidRoute from './InvalidRoute'
import FlexContainer from '../presentational/FlexContainer'
import { NavigationLayout } from '../presentational/MainLayout'
import ConnectedNavigationBackButton from './NavigationButtons'
import InfoArea from '../presentational/InfoArea'
import Button from '../presentational/InlineButton'

type PropTypes = {
  setPassword: typeof uiActions.setPassword
}

type StateTypes = {
  password?: string
  passwordRepeat?: string
  passwordConfirmed: boolean
  showPassword: boolean
}
class WalletCreate extends React.Component<PropTypes, StateTypes> {
  state = {
    password: '',
    passwordRepeat: '',
    passwordConfirmed: false,
    showPassword: false,
  }

  handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ password: event.target.value })
  }

  handlePasswordRepeatChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      passwordRepeat: event.target.value,
      passwordConfirmed: event.target.value === this.state.password,
    })
  }

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword })
  }

  handleSetPassword = () => {
    if (!this.state.password || !this.state.passwordRepeat) {
      return
    }

    const { success } = PasswordService.isPasswordValid(
      this.state.password,
      this.state.passwordRepeat
    )

    if (!success) {
      return
    }

    if (this.state.password !== '') {
      this.props.setPassword(this.state.password)
    }
  }

  render() {
    return (
      <NavigationLayout
        title="设置为新钱包"
        renderLeft={() => <ConnectedNavigationBackButton />}
      >
        <FlexContainer>
          <InfoArea>
            <ul>
              <li>Please set a strong password</li>
              <li>This password will be used to unlock your wallet</li>
              <li>请安全保存密码</li>
            </ul>
          </InfoArea>
          <FlexContainer withPadding alignItems="stretch">
            <FormControl>
              <InputLabel htmlFor="password">
                New Password (min. 8 chars)
              </InputLabel>
              <Input
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
            <div style={{ height: 32 }} />
            <FormControl>
              <InputLabel htmlFor="password-confirm">
                Confirm Password
              </InputLabel>
              <Input
                error={
                  !this.state.passwordConfirmed &&
                  this.state.password !== '' &&
                  this.state.passwordRepeat !== ''
                }
                id="password-confirm"
                type={this.state.showPassword ? 'text' : 'password'}
                value={this.state.passwordRepeat || ''}
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
          </FlexContainer>
          <FlexContainer withPadding justifyContent="flex-end">
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleSetPassword}
            >
              创建钱包
            </Button>
          </FlexContainer>
        </FlexContainer>
      </NavigationLayout>
    )
  }
}

const ConnectedComponent = connect(
  null,
  { setPassword: uiActions.setPassword }
)(WalletCreate)

export default (props: any) => (
  <AuthProtectedView>
    {({ status }) => {
      if (status === 'unknown') {
        return <ConnectedComponent {...props} />
      }

      return (
        <InvalidRoute message="Invalid state: Can't access this route with current application state." />
      )
    }}
  </AuthProtectedView>
)
