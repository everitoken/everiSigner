import * as React from 'react'
import FlexContainer from './FlexContainer'
import { createAccountWithMnemonic } from '../action'
import InfoArea from './InfoArea'
import {
  Divider,
  Stepper,
  Step,
  StepLabel,
  TextField,
  Button,
} from '@material-ui/core'
import AccountNameComponent from './AccountNameComponent'
import uuid = require('uuid')
import labels from '../../labels'
import SuccessInfoLayout from './SuccessInfoLayout'
import { RouteComponentProps, withRouter } from 'react-router-dom'

const STEPS = [
  { step: labels.ACCOUNT_NAME, action: labels.STEP_NEXT },
  { step: labels.MNEMONIC, action: labels.IMPORT_PRIVATE_KEY },
]

type StepInputSeedPhrasesPropTypes = {
  buttonText: string
  onNextClick: (words: string) => void
}


function StepInputSeedPhrases(props: StepInputSeedPhrasesPropTypes) {
  const [value, setValue] = React.useState('')

  const handleSubmit = () => {
    props.onNextClick(value.trim())
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setValue(value)
  }

  return (
    <FlexContainer>
      <FlexContainer withPadding>
        <TextField
          id="seed-phrase-input"
          label={labels.INPUT_MNEMONIC_WORDS}
          multiline
          fullWidth
          rows="5"
          inputProps={{
            style: { fontSize: '1.2rem', fontFamily: 'Roboto Mono' },
          }}
          margin="normal"
          required
          onChange={handleChange}
          variant="outlined"
        />
      </FlexContainer>
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
  onClick: typeof createAccountWithMnemonic
}

function AccountMnemonicImport(props: AccountImportPropType) {
  const [activeStep, setActiveStep] = React.useState(0)
  const [name, setName] = React.useState('')

  const handleCreateAccount = (words: string) => {
    props.onClick(
      {
        id: uuid.v4(),
        words,
        name,
      },
      false
    )

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
        <StepInputSeedPhrases
          buttonText={STEPS[activeStep].action}
          onNextClick={(words: string) => {
            handleNextStep()
            handleCreateAccount(words)
          }}
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
            You can directly import your account with the <b>Mnemonic words</b>.
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

export default AccountMnemonicImport
