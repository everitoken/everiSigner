import * as React from 'react'
import { useSelector } from 'react-redux'
import { getDecryptedMainAccount } from '../../store/getter'
import { NavigationLayout } from '../presentational/MainLayout'
import FlexContainer from '../presentational/FlexContainer'
import ConnectedNavigationBackButton from './NavigationButtons'
import InfoArea from '../presentational/InfoArea'
import { TextField } from '@material-ui/core'
import * as Evtjs from 'evtjs'
import Button from '../presentational/InlineButton'
import { useTranslation } from 'react-i18next'

function AccountSign() {
  const [value, setValue] = React.useState('')
  const [signature, setSignature] = React.useState('')
  const { t } = useTranslation()
  const { account } = useSelector(getDecryptedMainAccount)

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value)
  }

  function handleSign() {
    const { EvtKey } = Evtjs

    if (account) {
      EvtKey.sign(value, account.privateKey).then((signature: string) =>
        setSignature(signature)
      )
    }
  }

  return (
    <NavigationLayout
      title={t('SIGN')}
      renderLeft={() => <ConnectedNavigationBackButton />}
    >
      <FlexContainer>
        <FlexContainer>
          <div style={{ width: '100%' }}>
            <InfoArea>
              <p style={{ padding: 8 }}>{t('ACCOUNT_SIGN_DESCRIPTION')}</p>
            </InfoArea>
          </div>
          <FlexContainer withPadding justifyContent="space-around">
            <TextField
              label={t('DATA_TO_BE_SIGNED')}
              multiline
              rows="2"
              fullWidth
              value={value}
              onChange={handleChange}
              inputProps={{
                style: {
                  fontSize: '0.7rem',
                  fontFamily: 'Roboto Mono',
                },
                spellCheck: false,
              }}
              variant="outlined"
            />
            {signature ? (
              <TextField
                label={t('SIGNED_RESULT')}
                multiline
                rows="2"
                fullWidth
                value={signature}
                inputProps={{
                  style: {
                    fontSize: '0.7rem',
                    fontFamily: 'Roboto Mono',
                  },
                  spellCheck: false,
                }}
                variant="outlined"
              />
            ) : null}

            <Button
              style={{ marginTop: 20 }}
              variant="contained"
              color="primary"
              onClick={handleSign}
            >
              {t('SIGN_DATA')}
            </Button>
          </FlexContainer>
        </FlexContainer>
      </FlexContainer>
    </NavigationLayout>
  )
}

export default AccountSign
