import * as React from 'react'
import {
  Button,
  Stepper,
  Step,
  StepLabel,
  Divider,
  Link,
  TextField,
  CircularProgress,
} from '@material-ui/core'
import FlexContainer from './FlexContainer'
import { createAccountWithMnemonic } from '../action'
import InfoArea from './InfoArea'
import SeedWordsDisplay from './SeedWordsDisplay'
import { AccountStateType } from '../../store/reducer/accounts'
import * as uuid from 'uuid'
import SuccessInfoLayout from './SuccessInfoLayout'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import AccountNameComponent from './AccountNameComponent'
import labels from '../../labels'

const STEPS = [
  { step: '账户名', action: '下一步' },
  { step: '备份', action: '下一步' },
  { step: '验证', action: '创建账户' },
]

type StepDisplaySeedPhrasesPropTypes = {
  accountName: string
  words: string
  buttonText: string
  onNextClick: () => void
}

function StepDisplaySeedPhrases(props: StepDisplaySeedPhrasesPropTypes) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(props.words).then(() => {
      setCopied(true)
      setTimeout(() => {
        setCopied(false)
      }, 3000)
    })
  }

  return (
    <FlexContainer>
      <FlexContainer withPadding alignItems="flex-end">
        <p style={{ marginTop: 0 }}>
          Make sure to write down these words safely. In next step you will be
          asked to input these phrases in sequence.
        </p>
        <SeedWordsDisplay words={props.words} />
        <div
          style={{
            cursor: 'pointer',
          }}
        >
          <Link onClick={handleCopy}>{copied ? 'copied' : 'copy?'}</Link>
        </div>
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
            onClick={props.onNextClick}
          >
            {props.buttonText}
          </Button>
        </FlexContainer>
      </div>
    </FlexContainer>
  )
}

type StepVerifySeedPhrasesPropTypes = {
  buttonText: string
  words: string
  onNextClick: () => void
}

function StepVerifySeedPhrases(props: StepVerifySeedPhrasesPropTypes) {
  const [value, setValue] = React.useState('')
  const [hasError, setError] = React.useState(false)

  const handleSubmit = () => {
    if (value.trim() !== props.words) {
      setError(true)
    } else {
      props.onNextClick()
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setValue(value)
  }

  return (
    <FlexContainer>
      <FlexContainer withPadding>
        <TextField
          id="seed-phrase-verify"
          label={labels.INPUT_MNEMONIC_WORDS}
          multiline
          fullWidth
          rows="5"
          inputProps={{
            style: { fontSize: '1.2rem', fontFamily: 'Roboto Mono' },
          }}
          error={hasError}
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
        {labels.ACCOUNT_CREATE_SUCCESSFUL}
      </p>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => history.push('/')}
      >
        {labels.GO_BACK}
      </Button>
    </SuccessInfoLayout>
  )
}

const ConnectedStepSuccess = withRouter(StepSuccess)

type AccountCreatePropTypes = {
  accountNames: string[]
  account: AccountStateType | null
  words: string
  onClick: typeof createAccountWithMnemonic
}

function AccountCreate(props: AccountCreatePropTypes) {
  const [activeStep, setActiveStep] = React.useState(0)
  const [currentAccountId, setCurrentAccountId] = React.useState<null | string>(
    null
  )
  const [accountName, setAccountName] = React.useState('')

  const handleNextStep = () => {
    setActiveStep(activeStep + 1)
  }

  const handleCreateAccount = () => {
    const id = uuid.v4()

    props.onClick(
      {
        id,
        name: accountName,
        words: props.words,
      },
      true
    )

    setCurrentAccountId(id)
  }

  const renderStep = () => {
    if (activeStep === 0) {
      return (
        <AccountNameComponent
          accountNames={props.accountNames}
          autoFocus
          onNextClick={accountName => {
            setAccountName(accountName)
            handleNextStep()
          }}
          buttonText={STEPS[activeStep].action}
        />
      )
    } else if (activeStep === 1) {
      return (
        <StepDisplaySeedPhrases
          accountName={accountName}
          words={props.words}
          buttonText={STEPS[activeStep].action}
          onNextClick={handleNextStep}
        />
      )
    } else if (activeStep === STEPS.length - 1) {
      return (
        <StepVerifySeedPhrases
          buttonText={STEPS[activeStep].action}
          words={props.words}
          onNextClick={() => {
            handleNextStep()
            handleCreateAccount()
          }}
        />
      )
    } else if (props.account && props.account.id === currentAccountId) {
      return <ConnectedStepSuccess />
    }

    return (
      <FlexContainer alignItems="center" justifyContent="center">
        <CircularProgress disableShrink />
      </FlexContainer>
    )
  }

  if (props.account && currentAccountId === null) {
    return (
      <FlexContainer>
        <div>
          <InfoArea>
            <p style={{ padding: '8px 16px' }}>
              A default account has been created, now you can only create loose
              account. (TODO: better wording)
            </p>
          </InfoArea>
        </div>
        <FlexContainer withPadding alignSelf="stretch" alignItems="stretch">
          <p>A default account has been created.</p>
        </FlexContainer>
      </FlexContainer>
    )
  }

  return (
    <FlexContainer>
      <div>
        <InfoArea>
          <p style={{ padding: '8px 16px' }}>
            This is your <b>seed account</b>, this account will be recoverable
            with your seed phrases.
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

export default AccountCreate
