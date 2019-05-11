import * as React from 'react'
import {
  FormControl,
  InputLabel,
  Input,
  Button,
  Typography,
} from '@material-ui/core'
import FlexContainer from './FlexContainer'
import AlertDialog from './AlertDialog'

type PropTypes = {
  autoFocus?: boolean
  accountNames: string[]
  buttonText: string
  onNextClick: (accountName: string) => void
}
type StateProps = {
  accountName: string
  errorMessage: string
}

class AccountNameComponent extends React.PureComponent<PropTypes, StateProps> {
  static defaultState = { autoFocus: false }
  state = {
    accountName: '',
    errorMessage: '',
  }

  handleAccountChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = target
    this.setState({ accountName: value })
  }
  isValid = () => {
    if (this.props.accountNames.includes(this.state.accountName)) {
      return {
        isValid: false,
        errorMessage: `Account name: "${
          this.state.accountName
        }" already exists.`,
      }
    }
    if (
      this.state.accountName.length === 0 ||
      this.state.accountName.length > 25
    ) {
      return {
        isValid: false,
        errorMessage: 'Account name exceeds max length.',
      }
    }

    return { isValid: true, errorMessage: '' }
  }
  handleClick = () => {
    const { isValid, errorMessage } = this.isValid()

    this.setState({ errorMessage })

    if (!isValid) {
      return
    }

    this.props.onNextClick(this.state.accountName)
  }
  render() {
    return (
      <React.Fragment>
        <AlertDialog
          title="Error"
          open={this.state.errorMessage.length !== 0}
          onClose={() => {
            this.setState({ errorMessage: '' })
          }}
        >
          <Typography>{this.state.errorMessage}</Typography>
        </AlertDialog>
        <FlexContainer>
          <FlexContainer
            alignItems="stretch"
            justifyContent="center"
            withPadding
          >
            <FormControl>
              <InputLabel htmlFor="account-name">
                Specify account name (less than 25 chars)
              </InputLabel>
              <Input
                autoFocus={this.props.autoFocus}
                style={{ fontSize: 24 }}
                error={this.state.errorMessage.length !== 0}
                id="account-name"
                value={this.state.accountName}
                onChange={this.handleAccountChange}
              />
            </FormControl>
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
                onClick={this.handleClick}
              >
                {this.props.buttonText}
              </Button>
            </FlexContainer>
          </div>
        </FlexContainer>
      </React.Fragment>
    )
  }
}

export default AccountNameComponent
