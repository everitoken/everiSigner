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

function AccountNameComponent(props:PropTypes){
  const autoFocus = props.autoFocus || false
  const [accountName, setAccountName] = React.useState('')
  const [errorMessage, setErrorMessage] = React.useState('')

  const handleAccountChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = target
    setAccountName(value)
  }
  const validate = () => {
    if (props.accountNames.includes(accountName)) {
      return {
        isValid: false,
        errorMessage: `Account name: "${ accountName }" already exists.`,
      }
    }
    if (
      accountName.length === 0 ||
      accountName.length > 25
    ) {
      return {
        isValid: false,
        errorMessage: 'Account name exceeds max length.',
      }
    }

    return { isValid: true, errorMessage: '' }
  }
  const handleClick = () => {
    const { isValid, errorMessage } = validate()

    setErrorMessage(errorMessage)

    if (!isValid) {
      return
    }

    props.onNextClick(accountName)
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
                autoFocus={autoFocus}
                style={{ fontSize: 24 }}
                error={errorMessage.length !== 0}
                id="account-name"
                value={accountName}
                onChange={handleAccountChange}
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
                onClick={handleClick}
              >
                {props.buttonText}
              </Button>
            </FlexContainer>
          </div>
        </FlexContainer>
      </React.Fragment>
    )
}

export default AccountNameComponent
