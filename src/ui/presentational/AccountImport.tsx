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
} from '@material-ui/core'
import AccountNameComponent from './AccountNameComponent'
import * as Evtjs from 'evtjs'
import uuid = require('uuid')

const STEPS = [
  { step: '账户名', action: '下一步' },
  { step: '输入私钥', action: '导入私钥' },
]

type StepInputPrivateKeyPropTypes = {
  buttonText: string
  onNextClick: (privateKey: string) => void
}

type StepInputPrivateKeyStateProps = {
  privateKey: string
  publicKey: string
  error: boolean
}

class StepInputPrivateKey extends React.PureComponent<
  StepInputPrivateKeyPropTypes,
  StepInputPrivateKeyStateProps
> {
  state = {
    privateKey: '',
    publicKey: '',
    error: false,
  }

  handleSubmit = () => {
    const { EvtKey } = Evtjs // TODO extract to plugin system
    if (!EvtKey.isValidPrivateKey(this.state.privateKey)) {
      this.setState({ error: true })
    } else {
      this.props.onNextClick(this.state.privateKey)
    }
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    const { EvtKey } = Evtjs // TODO extract to plugin system
    let publicKey = ''
    try {
      publicKey = EvtKey.privateToPublic(value)
    } catch (e) {}

    this.setState({ privateKey: value, publicKey })
  }

  render() {
    return (
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
              error={this.state.error}
              required
              onChange={this.handleChange}
              variant="outlined"
            />
          </FlexContainer>

          {this.state.publicKey ? (
            <FlexContainer>
              <TextField
                id="seed-phrase-verify"
                label="对应的公钥"
                multiline
                rows="2"
                fullWidth
                value={this.state.publicKey}
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

type AccountImportPropType = {
  accountNames: string[]
  onClick: typeof importAccount
}

type AccountImportStateTypes = {
  activeStep: number
  name: string
  importedAccountIds: string[]
}

class AccountImport extends React.PureComponent<
  AccountImportPropType,
  AccountImportStateTypes
> {
  state = {
    activeStep: 0,
    name: '',
    importedAccountIds: [],
  }

  handleImportAccount = (privateKey: string) => {
    this.props.onClick({
      id: uuid.v4(),
      privateKey,
      name: this.state.name,
    })
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
    } else {
      return (
        <StepInputPrivateKey
          onNextClick={this.handleImportAccount}
          buttonText={STEPS[this.state.activeStep].action}
        />
      )
    }
  }

  render() {
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

export default AccountImport
