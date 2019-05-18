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

type StepInputSeedPhrasesStateTypes = {
  value: string
}

class StepInputSeedPhrases extends React.PureComponent<
  StepInputSeedPhrasesPropTypes,
  StepInputSeedPhrasesStateTypes
> {
  state = {
    value: '',
  }

  handleSubmit = () => {
    this.props.onNextClick(this.state.value.trim())
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    this.setState({ value })
  }

  render() {
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
            onChange={this.handleChange}
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
              onClick={this.handleSubmit}
            >
              {this.props.buttonText}
            </Button>
          </FlexContainer>
        </div>
      </FlexContainer>
    )
  }
}

class StepSuccess extends React.PureComponent<RouteComponentProps> {
  render() {
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
          onClick={() => this.props.history.push('/')}
        >
          Go to Account
        </Button>
      </SuccessInfoLayout>
    )
  }
}

const ConnectedStepSuccess = withRouter(StepSuccess)

type AccountImportPropType = {
  accountNames: string[]
  publicKeys: string[]
  onClick: typeof createAccountWithMnemonic
}

type AccountImportStateTypes = {
  activeStep: number
  name: string
  importedAccountIds: string[]
}

class AccountMnemonicImport extends React.PureComponent<
  AccountImportPropType,
  AccountImportStateTypes
> {
  state = {
    activeStep: 0,
    name: '',
    importedAccountIds: [],
  }

  handleCreateAccount = (words: string) => {
    this.props.onClick(
      {
        id: uuid.v4(),
        words,
        name: this.state.name,
      },
      false
    )

    this.handleNextStep()
  }

  handleNextStep = () => {
    this.setState({ activeStep: this.state.activeStep + 1 })
  }

  renderStep = () => {
    if (this.state.activeStep === 0) {
      return (
        <AccountNameComponent
          accountNames={this.props.accountNames}
          onNextClick={name => {
            this.setState({ name })
            this.handleNextStep()
          }}
          buttonText={STEPS[this.state.activeStep].action}
        />
      )
    } else if (this.state.activeStep === 1) {
      return (
        <StepInputSeedPhrases
          buttonText={STEPS[this.state.activeStep].action}
          onNextClick={(words: string) => {
            this.handleNextStep()
            this.handleCreateAccount(words)
          }}
        />
      )
    }

    return <ConnectedStepSuccess />
  }

  render() {
    return (
      <FlexContainer>
        <div>
          <InfoArea>
            <p style={{ padding: '8px 16px' }}>
              You can directly import your account with the{' '}
              <b>Mnemonic words</b>.
            </p>
          </InfoArea>
        </div>
        <FlexContainer alignSelf="stretch" alignItems="stretch">
          <Stepper activeStep={this.state.activeStep} style={{ padding: 16 }}>
            {STEPS.map(({ step }) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Divider />
          {this.renderStep()}
        </FlexContainer>
      </FlexContainer>
    )
  }
}

export default AccountMnemonicImport
