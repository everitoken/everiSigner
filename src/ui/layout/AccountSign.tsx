import * as React from 'react'
import { connect } from 'react-redux'
import { getDecryptedMainAccount } from '../../store/getter'
import { AccountStateType } from '../../store/reducer/accounts'
import { NavigationLayout } from '../presentational/MainLayout'
import FlexContainer from '../presentational/FlexContainer'
import ConnectedNavigationBackButton from './NavigationButtons'
import labels from '../../labels'
import InfoArea from '../presentational/InfoArea'
import { TextField } from '@material-ui/core'
import * as Evtjs from 'evtjs'
import Button from '../presentational/InlineButton'

type ConnectedProps = {
  account: AccountStateType | null
}

type StateProps = {
  value: string
  signature: string
}

class ConnectedAccountPayeeCode extends React.Component<
  ConnectedProps,
  StateProps
> {
  state = {
    value: '',
    signature: '',
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ value: event.target.value, signature: '' })
  }

  handleSign = () => {
    const { EvtKey } = Evtjs
    if (this.props.account) {
      EvtKey.sign(this.state.value, this.props.account.privateKey).then(
        (signature: string) => this.setState({ signature })
      )
    }
  }

  render() {
    return (
      <NavigationLayout
        title={labels.SIGN}
        renderLeft={() => <ConnectedNavigationBackButton />}
      >
        <FlexContainer>
          <FlexContainer>
            <div style={{ width: '100%' }}>
              <InfoArea>
                <p style={{ padding: 8 }}>{labels.ACCOUNT_SIGN_DESCRIPTION}</p>
              </InfoArea>
            </div>
            <FlexContainer withPadding justifyContent="space-around">
              <TextField
                label={labels.DATA_TO_BE_SIGNED}
                multiline
                rows="2"
                fullWidth
                value={this.state.value}
                onChange={this.handleChange}
                inputProps={{
                  style: {
                    fontSize: '0.7rem',
                    fontFamily: 'Roboto Mono',
                  },
                  spellCheck: false,
                }}
                variant="outlined"
              />
              {this.state.signature ? (
                <TextField
                  label={labels.SIGNED_RESULT}
                  multiline
                  rows="2"
                  fullWidth
                  value={this.state.signature}
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
                onClick={this.handleSign}
              >
                {labels.SIGN_DATA}
              </Button>
            </FlexContainer>
          </FlexContainer>
        </FlexContainer>
      </NavigationLayout>
    )
  }
}

export default connect(getDecryptedMainAccount)(ConnectedAccountPayeeCode)
