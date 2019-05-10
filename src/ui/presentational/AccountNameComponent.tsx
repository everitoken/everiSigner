import * as React from 'react'
import { FormControl, InputLabel, Input, Button } from '@material-ui/core'
import FlexContainer from './FlexContainer'

type PropTypes = {
  autoFocus?: boolean
  accountNames: string[]
  buttonText: string
  onNextClick: (accountName: string) => void
}
type StateProps = {
  accountName: string
  invalid: boolean
}

class AccountNameComponent extends React.PureComponent<PropTypes, StateProps> {
  static defaultState = { autoFocus: false }
  state = {
    accountName: '',
    invalid: false,
  }

  handleAccountChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = target
    this.setState({ accountName: value })
  }
  isValid = () => {
    if (this.props.accountNames.includes(this.state.accountName)) {
      return false
    }
    if (
      this.state.accountName.length === 0 ||
      this.state.accountName.length > 25
    ) {
      return false
    }

    return true
  }
  handleClick = () => {
    const isValid = this.isValid()

    if (!isValid) {
      this.setState({ invalid: true })
      return
    }

    this.setState({ invalid: false })

    this.props.onNextClick(this.state.accountName)
  }
  render() {
    return (
      <FlexContainer>
        <FlexContainer alignItems="stretch" justifyContent="center" withPadding>
          <FormControl>
            <InputLabel htmlFor="account-name">
              Specify account name (less than 25 chars)
            </InputLabel>
            <Input
              autoFocus={this.props.autoFocus}
              style={{ fontSize: 24 }}
              error={this.state.invalid}
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
    )
  }
}

export default AccountNameComponent
