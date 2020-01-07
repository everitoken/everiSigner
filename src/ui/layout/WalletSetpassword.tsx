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
import { useDispatch } from 'react-redux'
import InvalidRoute from './InvalidRoute'
import FlexContainer from '../presentational/FlexContainer'
import { NavigationLayout } from '../presentational/MainLayout'
import ConnectedNavigationBackButton from './NavigationButtons'
import InfoArea from '../presentational/InfoArea'
import Button from '../presentational/InlineButton'
import useAuthenticationState from '../../hooks/useAuthenticationState'
import { useHistory } from 'react-router-dom'

function WalletSetpassword() {
  const [password, setPassword] = React.useState('')
  const [passwordRepeat, setPasswordRepeat] = React.useState('')
  const [passwordConfirmed, setPasswordConfirmed] = React.useState(false)
  const [showPassword, setShowPassword] = React.useState(false)
  const dispatch = useDispatch()
  const history = useHistory()

  const [state] = useAuthenticationState()

  if (state !== 'unknown') {
    return (
      <InvalidRoute message="Invalid state: Can't access this route with current application state." />
    )
  }

  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value)
  }

  function handlePasswordRepeatChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setPasswordRepeat(event.target.value)
    setPasswordConfirmed(event.target.value === password)
  }

  function handleClickShowPassword() {
    setShowPassword(!showPassword)
  }

  function handleSetPassword() {
    if (!password || !passwordRepeat) {
      return
    }

    const { success } = PasswordService.isPasswordValid(
      password,
      passwordRepeat
    )

    if (!success) {
      return
    }

    if (password !== '') {
      dispatch(uiActions.setPassword(password))
      history.push('/wallet/decide')
    }
  }

  return (
    <NavigationLayout
      title="设置新钱包密码"
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
              type={showPassword ? 'text' : 'password'}
              value={password || ''}
              onChange={handlePasswordChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Toggle password visibility"
                    onClick={handleClickShowPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <div style={{ height: 32 }} />
          <FormControl>
            <InputLabel htmlFor="password-confirm">Confirm Password</InputLabel>
            <Input
              error={
                !passwordConfirmed && password !== '' && passwordRepeat !== ''
              }
              id="password-confirm"
              type={showPassword ? 'text' : 'password'}
              value={passwordRepeat || ''}
              onChange={handlePasswordRepeatChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Toggle password visibility"
                    onClick={handleClickShowPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
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
            onClick={handleSetPassword}
          >
            设置钱包密码
          </Button>
        </FlexContainer>
      </FlexContainer>
    </NavigationLayout>
  )
}

export default WalletSetpassword
