import * as React from 'react'
import * as uuid from 'uuid'
import NumberFormat from 'react-number-format'
import { NavigationLayout } from '../presentational/MainLayout'
import Button from '../presentational/InlineButton'
import FlexContainer from '../presentational/FlexContainer'
import labels from '../../labels'
import ConnectedNavigationBackButton from './NavigationButtons'
import { FormControl, InputLabel, Input, TextField } from '@material-ui/core'
import styled from 'styled-components'
import TokenSelectConnected from './TokenSelectConnected'
import { TokenDetail } from '../../types'
import Evtjs from 'evtjs'
import { get } from 'lodash'
import { connect } from 'react-redux'
import { transferft, transferftAcknowledge } from '../action'
import { getForTransferFungible } from '../../store/getter'
import { AccountStateType } from '../../store/reducer/accounts'
import SuccessInfoLayout from '../presentational/SuccessInfoLayout'

const Container = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 90%;
`

type PropTypes = {
  onSubmit: typeof transferft
  onSucceed: typeof transferftAcknowledge
  account: AccountStateType
  transactions: any[]
}

type StateTypes = {
  token: null | TokenDetail
  address: string
  amount: string
  memo: string
  sessionId: string
  addressErrorMsg: string
  amountErrorMsg: string
  transferring: boolean
}

function NumberFormatCustom(props) {
  const { inputRef, onChange, precision, ...other } = props

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value,
          },
        })
      }}
      decimalScale={precision || 5}
      fixedDecimalScale
      allowNegative={false}
      thousandSeparator
      isNumericString
    />
  )
}

class TransferFungibleToken extends React.PureComponent<PropTypes, StateTypes> {
  state = TransferFungibleToken.defaultState

  static defaultState = {
    token: null,
    address: '',
    amount: '',
    memo: '',
    sessionId: uuid.v4(),
    addressErrorMsg: '',
    amountErrorMsg: '',
    transferring: false,
  }

  reset = () => {
    this.props.onSucceed(this.state.sessionId)

    this.setState({
      ...TransferFungibleToken.defaultState,
      sessionId: uuid.v4(),
    })
  }

  shouldDisableTransferButton = () => {
    const { token } = this.state
    if (token === null) {
      return true
    }

    if (Number(get(token, 'value', 0)) === 0) {
      return true
    }

    return false
  }

  validate = () => {
    if (!Evtjs.EvtKey.isValidAddress(this.state.address)) {
      const addressErrorMsg = labels.ADDRESS_FORMAT_INVALID
      this.setState({ addressErrorMsg })
      return addressErrorMsg
    }

    const amount = Number(this.state.amount)
    if (Number.isNaN(amount) || amount === 0) {
      const amountErrorMsg = labels.TRANSFER_AMOUNT_INVALID
      this.setState({ amountErrorMsg })
      return amountErrorMsg
    }

    return true
  }

  handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ address: event.target.value, addressErrorMsg: '' })
  }

  handleTransferft = () => {
    const validateResult = this.validate()

    if (validateResult === true) {
      this.setState({ transferring: true })
      this.props.onSubmit(
        {
          from: this.props.account.publicKey,
          to: this.state.address,
          memo: this.state.memo,
          number: `${this.state.amount} S#${this.state.token.id}`,
        },
        this.state.sessionId
      )
    } else {
      alert(validateResult)
    }
  }

  handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ amount: event.target.value, amountErrorMsg: '' })
  }

  handleTokenReceive = (token: TokenDetail) => {
    this.setState({ token })
  }

  handleMemoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ memo: event.target.value })
  }

  renderTransfer = (transaction: any) => {
    const transactionSuccess = get(transaction, 'success')

    if (transactionSuccess === false) {
      alert(get(transaction, 'errorMsg', 'Error in transferring.'))
    }
    let transferring = this.state.transferring

    if (transaction) {
      transferring = false
    }

    return (
      <Container>
        <TokenSelectConnected onTokenReceive={this.handleTokenReceive} />
        <FormControl
          fullWidth
          margin="normal"
          error={Boolean(this.state.addressErrorMsg)}
        >
          <InputLabel htmlFor="to-address">{labels.ADDRESS_TO}</InputLabel>
          <Input
            id="to-address"
            value={this.state.address}
            onChange={this.handleAddressChange}
            inputProps={{
              style: {
                fontSize: '0.7rem',
                fontFamily: 'Roboto Mono',
              },
              spellCheck: false,
            }}
          />
        </FormControl>

        <FlexContainer
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <div style={{ width: '48%' }}>
            <FormControl
              margin="normal"
              error={Boolean(this.state.amountErrorMsg)}
            >
              <TextField
                margin="normal"
                label={labels.AMOUNT}
                value={this.state.amount}
                onChange={this.handleAmountChange}
                InputProps={{
                  inputComponent: NumberFormatCustom,
                }}
                inputProps={{
                  precision: this.state.token?.precision || 5,
                  style: {
                    fontFamily: 'Roboto Mono',
                  },
                  spellCheck: false,
                }}
              />
            </FormControl>
          </div>

          <div style={{ width: '48%' }}>
            <TextField
              margin="normal"
              label={labels.MEMO}
              multiline
              value={this.state.memo}
              onChange={this.handleMemoChange}
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
          disabled={
            this.shouldDisableTransferButton() ||
            (transferring && transaction === undefined)
          }
          onClick={this.handleTransferft}
        >
          {transferring && transactionSuccess !== false
            ? labels.TRANSFERRING
            : labels.TRANSFERFT}
        </Button>
      </Container>
    )
  }

  renderSuccess = (transaction: any) => {
    return (
      <Container>
        <SuccessInfoLayout>
          <p
            style={{
              padding: '8px 0',
              fontFamily: 'Roboto Mono',
              fontSize: '1.1rem',
            }}
          >
            {labels.TRANSFER_FUNGIBLE_SUCCEED}
          </p>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => this.reset()}
          >
            OK
          </Button>
        </SuccessInfoLayout>
      </Container>
    )
  }

  render() {
    const transaction = this.props.transactions.find(
      t => t.id === this.state.sessionId
    )

    const transactionSuccess = get(transaction, 'success')

    return (
      <NavigationLayout
        title={labels.TRANSFERFT}
        renderLeft={() => <ConnectedNavigationBackButton />}
      >
        {transactionSuccess === true
          ? this.renderSuccess(transaction)
          : this.renderTransfer(transaction)}
      </NavigationLayout>
    )
  }
}

const ConnectedTransferFungible = connect(getForTransferFungible, {
  onSubmit: transferft,
  onSucceed: transferftAcknowledge,
})(TransferFungibleToken)
export default ConnectedTransferFungible
