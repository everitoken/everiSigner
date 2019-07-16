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
import labels from '../../labels'

type PropTypes = {
  password: string
  children: (props: { password: string }) => React.ReactNode
}

type StateTypes = {
  password: string
  error: string
  showPassword: boolean
}
class PasswordProtectedView extends React.PureComponent<PropTypes, StateTypes> {
  state = { password: '', error: '', showPassword: false }

  handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ password: event.target.value })
  }

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword })
  }

  render() {
    if (
      !isEmpty(this.props.password) &&
      !isEmpty(this.state.password) &&
      this.state.password === this.props.password
    ) {
      return this.props.children({ password: this.state.password })
    }

    return (
      <FlexContainer justifyContent="center" withPadding>
        <FormControl fullWidth>
          <InputLabel htmlFor="password">
            {labels.TYPE_PASSWORD_TO_UNLOCK}
          </InputLabel>
          <Input
            error={Boolean(this.state.error)}
            id="password"
            type={this.state.showPassword ? 'text' : 'password'}
            value={this.state.password || ''}
            onChange={this.handlePasswordChange}
            autoFocus
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
      </FlexContainer>
    )
  }
}

export default PasswordProtectedView
