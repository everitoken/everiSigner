import * as React from 'react'
import * as Evtjs from 'evtjs'
import { NavigationLayout } from '../presentational/MainLayout'
import {
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Divider,
  makeStyles,
  TextField,
} from '@material-ui/core'
import ConnectedNavigationBackButton from './NavigationButtons'
import { useTranslation } from 'react-i18next'
import { useRouteMatch, useLocation, useHistory } from 'react-router-dom'
import Button from '../presentational/InlineButton'
import { StakeRespType } from '../../types'
import NumberFormat from 'react-number-format'
import useNetwork from '../../hooks/useNetworks'
import useValidator from '../../hooks/useValidator'
import { get } from 'lodash'
import { getEvtEndpoint } from '../util'
import { getDecryptedMainAccount } from '../../store/getter'
import { useSelector } from 'react-redux'
import Loader from '../presentational/Loader'
import MessageContext from '../../context/Message'

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
      decimalScale={precision}
      fixedDecimalScale
      allowNegative={false}
      thousandSeparator
      isNumericString
    />
  )
}

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 180,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}))

export default function StakeCreate() {
  const classes = useStyles()
  const match = useRouteMatch()
  const history = useHistory()
  const { t } = useTranslation()
  const {
    state: { stake },
  } = useLocation<{ stake: StakeRespType }>()

  const [, getSelected] = useNetwork([])
  const network = getSelected()
  const { data } = useValidator(network)
  const { account } = useSelector(getDecryptedMainAccount)

  const [validator, setValidator] = React.useState('')
  const [type, setType] = React.useState('active')
  const [days, setDays] = React.useState(7)
  const [amount, setAmount] = React.useState(0)
  const [loading, setLoading] = React.useState(false)
  const { show } = React.useContext(MessageContext)

  if (!match) {
    return null
  }

  function handleSubmit() {
    const apiCaller = new Evtjs.default({
      endpoint: getEvtEndpoint(network),
      keyProvider: [account.privateKey],
    })

    setLoading(true)
    const fixDays = type === 'active' ? 0 : days

    apiCaller
      .pushTransaction(
        new Evtjs.EvtAction(
          'staketkns',
          {
            staker: account.publicKey,
            validator,
            amount: `${amount} S#1`,
            type,
            fixed_days: fixDays,
          },
          '.staking',
          validator
        )
      )
      .then(trx => {
        setLoading(false)
        show({ message: t('STAKE_SUCCESSFUL') })
        setTimeout(() => {
          history.goBack()
        }, 800)
      })
      .catch(err => alert(err))
      .finally(() => setLoading(false))
  }

  function handleValidatorChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValidator(e.target.value)
  }

  function handleTypeChange(e: React.ChangeEvent<HTMLInputElement>) {
    setType(e.target.value)
  }

  function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    setAmount(e.target.value)
  }

  function handleDaysChange(e: React.ChangeEvent<HTMLInputElement>) {
    setDays(e.target.value)
  }

  return (
    <NavigationLayout
      title={t('STACK_TITLE')}
      renderLeft={() => <ConnectedNavigationBackButton />}
    >
      {loading ? (
        <Loader />
      ) : (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: 16,
            width: '100%',
          }}
        >
          <div style={{ height: 280 }}>
            <FormControl fullWidth className={classes.formControl}>
              <InputLabel id="validator-select-label">
                {t('STAKE_VALIDATOR_NAME')}
              </InputLabel>
              <Select
                labelId="validator-select-label"
                id="validator-select"
                value={validator}
                onChange={handleValidatorChange}
              >
                {get(data, 'validators', []).map(validator => (
                  <MenuItem key={validator.name} value={validator.name}>
                    <span style={{ fontSize: 15, fontWeight: 'bold' }}>
                      {`${validator.name}`}
                    </span>
                    <span className="everitoken-mono">
                      {` (${validator.current_net_value})`}
                    </span>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth className={classes.formControl}>
              <InputLabel id="type-select-label">
                {t('STAKE_TYPE_NAME')}
              </InputLabel>
              <Select
                labelId="type-select-label"
                id="type-select"
                value={type}
                onChange={handleTypeChange}
              >
                <MenuItem value={'active'}>{t('STAKE_TYPE_ACTIVE')}</MenuItem>
                <MenuItem value={'fixed'}>{t('STAKE_TYPE_FIXED')}</MenuItem>
              </Select>
            </FormControl>
            {type === 'fixed' ? (
              <FormControl fullWidth className={classes.formControl}>
                <TextField
                  label={t('STAKE_DURATION_NAME')}
                  value={days}
                  onChange={handleDaysChange}
                  InputProps={{
                    inputComponent: NumberFormatCustom,
                  }}
                  inputProps={{
                    precision: 0,
                    style: {
                      fontFamily: 'Roboto Mono',
                    },
                    spellCheck: false,
                  }}
                />
              </FormControl>
            ) : null}
            <FormControl fullWidth className={classes.formControl}>
              <TextField
                label={t('AMOUNT')}
                value={amount}
                onChange={handleAmountChange}
                InputProps={{
                  inputComponent: NumberFormatCustom,
                }}
                inputProps={{
                  precision: 5,
                  style: {
                    fontFamily: 'Roboto Mono',
                  },
                  spellCheck: false,
                }}
              />
            </FormControl>
          </div>

          <div>
            <Divider />
            <p>
              {`${t('AVAILABLE_TO_STAKE')}: `}
              <span className="everitoken-mono">{stake.amount / 100000}</span>
            </p>
            <Button
              variant="contained"
              color="primary"
              size="large"
              disabled={stake.amount === 0 || loading}
              onClick={handleSubmit}
            >
              {loading ? t('STAKE_STAKING_IN_PROGRESS') : t('CREATE_STAKE_BTN')}
            </Button>
          </div>
        </div>
      )}
    </NavigationLayout>
  )
}
