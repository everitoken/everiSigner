import * as React from 'react'
import { isEmpty } from 'lodash'
import FlexContainer from '../presentational/FlexContainer'
import {
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
} from '@material-ui/core'

import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import { useTranslation } from 'react-i18next'

type PropTypes = {
  password: string
  children: (props: { password: string }) => React.ReactElement
}

const PasswordProtectedView = (props: PropTypes) => {
  const [password, setPassword] = React.useState('')
  const [showPassword, toggleShowPassword] = React.useState(false)
  const { t } = useTranslation()

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  if (
    !isEmpty(props.password) &&
    !isEmpty(password) &&
    password === props.password
  ) {
    return props.children({ password })
  }

  return (
    <FlexContainer justifyContent="center" withPadding>
      <FormControl fullWidth>
        <InputLabel htmlFor="password">
          {t('TYPE_PASSWORD_TO_UNLOCK')}
        </InputLabel>
        <Input
          id="password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={handlePasswordChange}
          autoFocus
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="Toggle password visibility"
                onClick={() => toggleShowPassword(!showPassword)}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </FlexContainer>
  )
}

export default PasswordProtectedView
