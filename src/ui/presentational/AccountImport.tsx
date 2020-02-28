import * as React from 'react'
import FlexContainer from './FlexContainer'
import { importAccount } from '../action'
import InfoArea from './InfoArea'
import {
  Divider,
  Stepper,
  Step,
  StepLabel,
  TextField,
  Button,
  Typography,
} from '@material-ui/core'
import AccountNameComponent from './AccountNameComponent'
import * as Evtjs from 'evtjs'
import * as uuid from 'uuid'
import AlertDialog from './AlertDialog'
import SuccessInfoLayout from './SuccessInfoLayout'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const STEPS = [
  { step: 'ACCOUNT_NAME', action: 'STEP_NEXT' },
  { step: 'INPUT_PRIVCATE_KEY', action: 'IMPORT_PRIVATE_KEY' },
]

type StepInputPrivateKeyPropTypes = {
  buttonText: string
  publicKeys: string[]
  onNextClick: (privateKey: string) => void
}

function StepInputPrivateKey(props: StepInputPrivateKeyPropTypes) {
  const [privateKey, setPrivateKey] = React.useState('')
  const [publicKey, setPublicKey] = React.useState('')
  const [hasError, setError] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState('')
  const { t } = useTranslation()

  const handleSubmit = () => {
    const { EvtKey } = Evtjs // TODO extract to plugin system
    if (!EvtKey.isValidPrivateKey(privateKey)) {
      setError(true)
    } else {
      const publicKey = EvtKey.privateToPublic(privateKey)

      if (props.publicKeys.includes(publicKey)) {
        setErrorMessage(t('PRIVATE_KEY_IMPORTED_ALREADY'))
      } else {
        props.onNextClick(privateKey)
      }
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    const { EvtKey } = Evtjs // TODO extract to plugin system
    let publicKey = ''
    try {
      publicKey = EvtKey.privateToPublic(value)
    } catch (e) {}

    setPrivateKey(value)
    setPublicKey(publicKey)
  }

  return (
    <React.Fragment>
      <AlertDialog
        title="Error"
        open={errorMessage.length !== 0}
        onClose={() => {
          setErrorMessage('')
        }}
      >
        <Typography>{errorMessage}</Typography>
      </AlertDialog>
      <FlexContainer>
        <div
          style={{
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            padding: '12px 16px',
            alignSelf: 'stretch',
          }}
        >
          <FlexContainer>
            <TextField
              id="seed-phrase-verify"
              label={t('INPUT_TOBE_IMPORTED_PRTIVATE_KEY')}
              multiline
              rows="2"
              fullWidth
              inputProps={{
                style: {
                  fontSize: '0.8rem',
                  fontFamily: 'Roboto Mono',
                },
                spellCheck: false,
              }}
              error={hasError}
              required
              onChange={handleChange}
              variant="outlined"
            />
          </FlexContainer>

          {publicKey ? (
            <FlexContainer>
              <TextField
                id="seed-phrase-verify"
                label={t('CORRESPOND_PUBLICKEY')}
                multiline
                rows="2"
                fullWidth
                value={publicKey}
                inputProps={{
                  style: {
                    fontSize: '0.8rem',
                    fontFamily: 'Roboto Mono',
                  },
                  spellCheck: false,
                }}
                variant="outlined"
              />
            </FlexContainer>
          ) : null}
        </div>

        <div style={{ alignSelf: 'stretch' }}>
          <FlexContainer
            withPadding
            alignItems="stretch"
            justifyContent="flex-end"
          >
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleSubmit}
            >
              {props.buttonText}
            </Button>
          </FlexContainer>
        </div>
      </FlexContainer>
    </React.Fragment>
  )
}

function StepSuccess({ history }: RouteComponentProps) {
  const { t } = useTranslation()
  return (
    <SuccessInfoLayout>
      <p
        style={{
          padding: '8px 0',
          fontFamily: 'Roboto Mono',
          fontSize: '1.1rem',
        }}
      >
        {t('ACCOUNT_IMPORT_SUCCESSFUL')}
      </p>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => history.push('/')}
      >
        {t('GO_BACK')}
      </Button>
    </SuccessInfoLayout>
  )
}

const ConnectedStepSuccess = withRouter(StepSuccess)

type AccountImportPropType = {
  accountNames: string[]
  publicKeys: string[]
  onClick: typeof importAccount
}

function AccountImport(props: AccountImportPropType) {
  const [activeStep, setActiveStep] = React.useState(0)
  const [name, setName] = React.useState('')
  const { t } = useTranslation()

  const handleNextStep = () => {
    setActiveStep(activeStep + 1)
  }

  const handleImportAccount = (privateKey: string) => {
    props.onClick({
      id: uuid.v4(),
      privateKey,
      name,
    })
    handleNextStep()
  }

  const renderStep = () => {
    if (activeStep === 0) {
      return (
        <AccountNameComponent
          accountNames={props.accountNames}
          onNextClick={name => {
            setName(name)
            handleNextStep()
          }}
          buttonText={t(STEPS[activeStep].action)}
        />
      )
    } else if (activeStep === 1) {
      return (
        <StepInputPrivateKey
          publicKeys={props.publicKeys}
          onNextClick={handleImportAccount}
          buttonText={t(STEPS[activeStep].action)}
        />
      )
    }

    return <ConnectedStepSuccess />
  }

  return (
    <FlexContainer>
      <div>
        <InfoArea>
          <p style={{ padding: '8px 16px' }}>
            You can directly import your account with the <b>private key</b>.
          </p>
        </InfoArea>
      </div>
      <FlexContainer alignSelf="stretch" alignItems="stretch">
        <Stepper activeStep={activeStep} style={{ padding: 16 }}>
          {STEPS.map(({ step }) => (
            <Step key={step}>
              <StepLabel>{t(step)}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Divider />
        {renderStep()}
      </FlexContainer>
    </FlexContainer>
  )
}

export default AccountImport
