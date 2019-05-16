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
import { createSeedAccount } from '../action'
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
type StepDisplaySeedPhrasesStateTypes = {
  copied: boolean
}

class StepDisplaySeedPhrases extends React.PureComponent<
  StepDisplaySeedPhrasesPropTypes,
  StepDisplaySeedPhrasesStateTypes
> {
  timeoutHandler: any
  constructor(props: StepDisplaySeedPhrasesPropTypes) {
    super(props)
    this.timeoutHandler = null
  }

  state = {
    copied: false,
  }

  componentDidMount() {
    if (this.timeoutHandler) {
      clearTimeout(this.timeoutHandler)
    }
  }

  handleCopy = () => {
    navigator.clipboard.writeText(this.props.words).then(() => {
      this.setState({ copied: true })
      this.timeoutHandler = setTimeout(() => {
        this.setState({ copied: false })
      }, 3000)
    })
  }

  render() {
    return (
      <FlexContainer>
        <FlexContainer withPadding>
          <p style={{ marginTop: 0 }}>
            Make sure to write down these words safely. In next step you will be
            asked to input these phrases in sequence.
          </p>
          <SeedWordsDisplay words={this.props.words} />
          <div
            style={{
              position: 'absolute',
              right: '10px',
              bottom: '65px',
              cursor: 'pointer',
            }}
          >
            <Link onClick={this.handleCopy}>
              {this.state.copied ? 'copied' : 'copy?'}
            </Link>
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
              onClick={this.props.onNextClick}
            >
              {this.props.buttonText}
            </Button>
          </FlexContainer>
        </div>
      </FlexContainer>
    )
  }
}

type StepVerifySeedPhrasesPropTypes = {
  buttonText: string
  words: string
  onNextClick: () => void
}

type StepVerifySeedPhrasesStateTypes = {
  value: string
  error: boolean
}
class StepVerifySeedPhrases extends React.PureComponent<
  StepVerifySeedPhrasesPropTypes,
  StepVerifySeedPhrasesStateTypes
> {
  state = {
    value: '',
    error: false,
  }

  handleSubmit = () => {
    if (this.state.value.trim() !== this.props.words) {
      this.setState({ error: true })
    } else {
      this.props.onNextClick()
    }
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
            id="seed-phrase-verify"
            label="Input your seed phrases here"
            multiline
            fullWidth
            rows="5"
            inputProps={{
              style: { fontSize: '1.2rem', fontFamily: 'Roboto Mono' },
            }}
            error={this.state.error}
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
          {labels.ACCOUNT_CREATE_SUCCESSFUL}
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

type AccountCreatePropTypes = {
  accountNames: string[]
  account: AccountStateType | null
  words: string
  onClick: typeof createSeedAccount
}

type AccountCreateStateTypes = {
  activeStep: number
  accountName: string
  currentAccountId: string | null
}

class AccountCreate extends React.PureComponent<
  AccountCreatePropTypes,
  AccountCreateStateTypes
> {
  state = {
    activeStep: 0,
    currentAccountId: null,
    accountName: '',
  }

  handleNextStep = () => {
    this.setState({ activeStep: this.state.activeStep + 1 })
  }

  handleCreateAccount = () => {
    const id = uuid.v4()

    this.props.onClick({
      id,
      name: this.state.accountName,
      words: this.props.words,
    })

    this.setState({
      currentAccountId: id,
    })
  }

  renderStep = () => {
    if (this.state.activeStep === 0) {
      return (
        <AccountNameComponent
          accountNames={this.props.accountNames}
          autoFocus
          onNextClick={accountName => {
            this.setState({ accountName })
            this.handleNextStep()
          }}
          buttonText={STEPS[this.state.activeStep].action}
        />
      )
    } else if (this.state.activeStep === 1) {
      return (
        <StepDisplaySeedPhrases
          accountName={this.state.accountName}
          words={this.props.words}
          buttonText={STEPS[this.state.activeStep].action}
          onNextClick={this.handleNextStep}
        />
      )
    } else if (this.state.activeStep === STEPS.length - 1) {
      return (
        <StepVerifySeedPhrases
          buttonText={STEPS[this.state.activeStep].action}
          words={this.props.words}
          onNextClick={() => {
            this.handleNextStep()
            this.handleCreateAccount()
          }}
        />
      )
    } else if (
      this.props.account &&
      this.props.account.id === this.state.currentAccountId
    ) {
      return <ConnectedStepSuccess />
    }

    return (
      <FlexContainer alignItems="center" justifyContent="center">
        <CircularProgress disableShrink />
      </FlexContainer>
    )
  }

  render() {
    if (this.props.account && this.state.currentAccountId === null) {
      return (
        <FlexContainer>
          <div>
            <InfoArea>
              <p style={{ padding: '8px 16px' }}>
                A default account has been created, now you can only create
                loose account. (TODO: better wording)
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

export default AccountCreate
