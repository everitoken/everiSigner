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
import uuid = require('uuid')
import AlertDialog from './AlertDialog'
import labels from '../../labels'
import SuccessInfoLayout from './SuccessInfoLayout'
import { RouteComponentProps, withRouter } from 'react-router-dom'

const STEPS = [
  { step: '账户名', action: '下一步' },
  { step: '输入私钥', action: '导入私钥' },
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

  const handleSubmit = () => {
    const { EvtKey } = Evtjs // TODO extract to plugin system
    if (!EvtKey.isValidPrivateKey(privateKey)) {
      setError(true)
    } else {
      const publicKey = EvtKey.privateToPublic(privateKey)

      if (props.publicKeys.includes(publicKey)) {
        setErrorMessage(labels.PRIVATE_KEY_IMPORTED_ALREADY)
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
              label="输入要导入的私钥"
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
                label="对应的公钥"
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
  return (
    <SuccessInfoLayout>
      <p
        style={{
          padding: '8px 0',
          fontFamily: 'Roboto Mono',
          fontSize: '1.1rem',
        }}
      >
        {labels.ACCOUNT_IMPORT_SUCCESSFUL}
      </p>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => history.push('/')}
      >
        Go to Account
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

  const handleImportAccount = (privateKey: string) => {
    props.onClick({
      id: uuid.v4(),
      privateKey,
      name,
    })
    handleNextStep()
  }

  const handleNextStep = () => {
    setActiveStep(activeStep + 1)
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
          buttonText={STEPS[activeStep].action}
        />
      )
    } else if (activeStep === 1) {
      return (
        <StepInputPrivateKey
          publicKeys={props.publicKeys}
          onNextClick={handleImportAccount}
          buttonText={STEPS[activeStep].action}
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
              <StepLabel>{step}</StepLabel>
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
