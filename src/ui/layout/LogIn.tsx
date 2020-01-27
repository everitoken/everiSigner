import * as React from 'react'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import FlexContainer from '../presentational/FlexContainer'
import { useDispatch, useSelector } from 'react-redux'
import {
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
} from '@material-ui/core'
import Button from '../presentational/InlineButton'

import * as uiActions from '../action'
import { getPasswordHash } from '../../store/getter'
import { verifyPassword } from '../../service/PasswordService'
import Logo from '../presentational/Logo'
import ScreenHeader from '../presentational/ScreenHeader'
import { useTranslation } from 'react-i18next'

type PropTypes = {
  message: string
}

function Login(props: PropTypes) {
  const [invalid, setInValid] = React.useState(false)
  const [password, setPassword] = React.useState('')
  const [showPassword, setShowPassword] = React.useState(false)
  const passwordHash = useSelector(getPasswordHash)
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const onUnlock = () => {
    const isPasswordValid =
      passwordHash != null && verifyPassword(password, passwordHash)

    setInValid(!isPasswordValid)

    if (isPasswordValid) {
      dispatch(uiActions.logIn(password))
    }
  }
  const handleKeyUp = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      onUnlock()
    }
  }
  return (
    <FlexContainer withPadding alignItems="center">
      <FlexContainer justifyContent="space-around">
        <Logo />
        <FlexContainer justifyContent="center" alignItems="center">
          <ScreenHeader title={props.message} withBackgroundColor={false} />
          <FormControl style={{ width: '90%' }}>
            <InputLabel htmlFor="password">
              {t('TYPE_PASSWORD_TO_UNLOCK')}
            </InputLabel>
            <Input
              error={invalid}
              id="password"
              autoFocus
              type={showPassword ? 'text' : 'password'}
              value={password || ''}
              onChange={handlePasswordChange}
              onKeyUp={handleKeyUp}
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
      </FlexContainer>
      <Button
        variant="contained"
        color="primary"
        disabled={password.length === 0}
        size="large"
        onClick={onUnlock}
      >
        {t('UNLOCK')}
      </Button>
    </FlexContainer>
  )
}

export default Login
