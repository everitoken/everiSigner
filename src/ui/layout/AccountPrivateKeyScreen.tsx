import * as React from 'react'
import WithAuthentication from './WithAuthentication'
import InvalidRoute from './InvalidRoute'
import FlexContainer from '../presentational/FlexContainer'
import Button from '../presentational/InlineButton'

import { NavigationLayout } from '../presentational/MainLayout'
import ConnectedNavigationBackButton from './NavigationButtons'
import { getPasswordProtectedView } from '../../store/getter'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import PasswordProtectedView from '../presentational/PasswordProtectedView'
import { AccountStateType } from '../../store/reducer/accounts'
import { decryptAccount } from '../../service/PasswordService'
import { TextField } from '@material-ui/core'
import InfoArea from '../presentational/InfoArea'
import { useCopyToClipboard } from '../../hooks/componentHooks'
import { useTranslation } from 'react-i18next'

type PropTypes = {
  account: AccountStateType | undefined
  password: string
}

function AccountExportPrivateKeyScreen(
  props: PropTypes & RouteComponentProps<{ id: string }>
) {
  const { t } = useTranslation()
  const [, handleCopy] = useCopyToClipboard(t('COPY_PRIVATE_KEY_SUCCESSFUL'))

  return (
    <NavigationLayout
      title={t('PRIVATE_KEY')}
      renderLeft={() => <ConnectedNavigationBackButton />}
    >
      <PasswordProtectedView password={props.password}>
        {({ password }) => {
          if (props.account == null) {
            return <p>{t('FAIL_FIND_ACCOUNT')}</p>
          }

          const account = decryptAccount(password, props.account)

          return (
            <FlexContainer>
              <div style={{ width: '100%' }}>
                <InfoArea>
                  <p style={{ padding: 8 }}>{t('GUARD_PRIVATE_KEY_SAFELY')}</p>
                </InfoArea>
              </div>
              <FlexContainer withPadding justifyContent="space-around">
                <TextField
                  label={t('PRIVATE_KEY')}
                  multiline
                  rows="2"
                  fullWidth
                  value={account.privateKey}
                  inputProps={{
                    style: {
                      fontSize: '0.8rem',
                      fontFamily: 'Roboto Mono',
                    },
                    spellCheck: false,
                  }}
                  variant="outlined"
                />

                <Button
                  style={{ marginTop: 20 }}
                  variant="contained"
                  color="primary"
                  onClick={() => handleCopy(account.privateKey)}
                >
                  {t('COPY_PRIVATE_KEY')}
                </Button>
              </FlexContainer>
            </FlexContainer>
          )
        }}
      </PasswordProtectedView>
    </NavigationLayout>
  )
}

const ConnectedView = connect(getPasswordProtectedView)(
  AccountExportPrivateKeyScreen
)

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
