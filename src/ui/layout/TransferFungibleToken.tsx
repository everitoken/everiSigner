import * as React from 'react'
import { NavigationLayout } from '../presentational/MainLayout'
import Button from '../presentational/InlineButton'
import FlexContainer from '../presentational/FlexContainer'
import labels from '../../labels'
import { ConnectedNavigationBackButton } from './NavigationButtons'
import { FormControl, InputLabel, Input, TextField } from '@material-ui/core'
import TokenSelect from '../presentational/TokenSelect'
import styled from 'styled-components'

const balance = {
  id: 1,
  name: 'EVT',
  displayName: 'EVT display',
  logoDataUri:
    'data:image/jpeg;base64,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',
  value: '100',
}

const Container = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 90%;
`

type PropTypes = {}
type StateTypes = {
  address: string
  amount: number | undefined
  memo: string
}

class TransferFungibleToken extends React.PureComponent<PropTypes, StateTypes> {
  state = {
    address: '',
    amount: undefined,
    memo: '',
  }
  handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ address: event.target.value })
  }

  handleTransferft = () => {}
  handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ amount: event.target.value })
  }

  render() {
    return (
      <NavigationLayout
        title={labels.PAYEE_CODE}
        renderLeft={() => <ConnectedNavigationBackButton />}
      >
        <Container>
          <TokenSelect loading={false} data={balance} />

          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="to-address">{labels.ADDRESS_TO}</InputLabel>
            <Input
              id="to-address"
              value={this.state.address}
              onChange={this.handleAddressChange}
            />
          </FormControl>

          <FlexContainer
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <div style={{ width: '48%' }}>
              <FormControl margin="normal">
                <InputLabel htmlFor="amount">{labels.AMOUNT}</InputLabel>
                <Input
                  id="amount"
                  value={this.state.amount}
                  onChange={this.handleAmountChange}
                />
              </FormControl>
            </div>

            <div style={{ width: '48%' }}>
              <TextField
                margin="normal"
                label={labels.MEMO}
                multiline
                value={this.state.memo}
                inputProps={{
                  style: {
                    fontFamily: 'Roboto Mono',
                  },
                  spellCheck: false,
                }}
              />
            </div>
          </FlexContainer>

          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={this.handleTransferft}
          >
            {labels.TRANSFERFT}
          </Button>
        </Container>
      </NavigationLayout>
    )
  }
}

export default TransferFungibleToken
