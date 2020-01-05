import * as React from 'react'
import WithAuthentication from './WithAuthentication'
import InvalidRoute from './InvalidRoute'
import FlexContainer from '../presentational/FlexContainer'

import { NavigationLayout } from '../presentational/MainLayout'
import ConnectedNavigationBackButton from './NavigationButtons'
import { getPasswordProtectedView } from '../../store/getter'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import labels from '../../labels'
import PasswordProtectedView from '../presentational/PasswordProtectedView'
import { exportWallet } from '../action'
import InfoArea from '../presentational/InfoArea'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import {
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
} from '@material-ui/core'
import Button from '../presentational/InlineButton'

type PropTypes = {
  password: string
  onExportWallet: typeof exportWallet
}

const WalletExportScreen = (
  props: PropTypes & RouteComponentProps<{ id: string }>
) => {
  const [password, setPassword] = React.useState('')
  const [showPassword, toggleShowPassword] = React.useState(false)
  const [disableExportBtn, setDisableExportBtn] = React.useState(true)

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const password = event.target.value

    setPassword(event.target.value)
    setDisableExportBtn(password.length === 0)
  }

  return (
    <NavigationLayout
      title={labels.BACKUP_WALLET}
      renderLeft={() => <ConnectedNavigationBackButton />}
    >
      <PasswordProtectedView password={props.password}>
        {() => {
          return (
            <FlexContainer>
              <div style={{ width: '100%' }}>
                <InfoArea>
                  <ul style={{ paddingRight: '11px' }}>
                    <li>{labels.BACKUP_INFO_TEXT_SAVE_TO_COMPUTER}</li>
                    <li>{labels.BACKUP_INFO_TEXT_ADDITIONAL_PASSPHRASE}</li>
                  </ul>
                </InfoArea>
              </div>
              <FlexContainer withPadding justifyContent="space-around">
                <FormControl fullWidth>
                  <InputLabel htmlFor="password">
                    {labels.BACKUP_WALLET_ADDITIONAL_PASSPHRASE_BTN_LABEL}
                  </InputLabel>
                  <Input
                    id="additional-password"
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
                <Button
                  disabled={disableExportBtn}
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={() =>
                    props.onExportWallet({
                      walletPassword: props.password,
                      backupPassword: password,
                    })
                  }
                >
                  {labels.BACKUP_WALLET_BTN_TEXT}
                </Button>
              </FlexContainer>
            </FlexContainer>
          )
        }}
      </PasswordProtectedView>
    </NavigationLayout>
  )
}

const ConnectedView = connect(getPasswordProtectedView, {
  onExportWallet: exportWallet,
})(WalletExportScreen)

export default (props: RouteComponentProps<{ id: string }>) => (
  <WithAuthentication>
    {({ status }) => {
      if (status === 'password') {
        return <ConnectedView {...props} />
      }

      return (
        <InvalidRoute message="everiSigner needs to be unlock in order to show account list." />
      )
    }}
  </WithAuthentication>
)
