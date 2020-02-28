import * as React from 'react'
import * as Evtjs from 'evtjs'
import { NavigationLayout } from '../presentational/MainLayout'
import ConnectedNavigationBackButton from './NavigationButtons'
import { useTranslation } from 'react-i18next'
import {
  FormControl,
  InputLabel,
  Divider,
  Input,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Typography,
} from '@material-ui/core'
import Button from '../presentational/InlineButton'
import useBinanceTxHash from '../../hooks/useBinanceTxHash'
import Loader from '../presentational/Loader'
import { get } from 'lodash'
import { convertBinanceAmountToEvt, getEvtEndpoint } from '../util'
import useNetwork from '../../hooks/useNetworks'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ErrorIcon from '@material-ui/icons/CancelOutlined'
import TruncateTextWithTooptip from '../presentational/AddressWithTooltip'
import SearchingIcon from '@material-ui/icons/AutorenewOutlined'

const EVT_SWAP_ADDR = 'EVT5NYzcUjJEpGunhJJZmw8r2qph2uDhGBkhCWSJTp3Nv3VQ7aLT3'
const BINANCE_SWAP_ADDR = 'bnb1v3fl4kuwuhzf3g7ghscsq7uzmu5dw50waseptd'
const EVT_COIN_NAME = 'EVT-49B'

function Transaction(props: { data: {}; error: string }) {
  const { t } = useTranslation()
  const { tx, ok, code } = props.data
  const [evtTx, setEvtTx] = React.useState(null)

  if (props.error || Number(code) === 500) {
    return <p>Tx hash is invalid, please double check.</p>
  }

  const { type, value } = tx

  if (type !== 'auth/StdTx') {
    return <p>Unsupported transaction type.</p>
  }

  if (!ok) {
    return <p>This Tx is not valid.</p>
  }

  const evtAddr = get(value, 'memo', '')
  const isEvtAddrValid = Evtjs.EvtKey.isValidAddress(evtAddr)
  const binanceSwapAddr = get(value, 'msg[0].value.outputs[0].address')
  const amount = get(value, 'msg[0].value.outputs[0].coins[0].amount')
  const coin = get(value, 'msg[0].value.outputs[0].coins[0].denom')
  const convertedAmount = Number(convertBinanceAmountToEvt(amount))

  const [, getSelected] = useNetwork([])
  const network = getSelected()

  const apiCaller = new Evtjs.default({
    endpoint: getEvtEndpoint(network),
    keyProvider: [],
  })

  React.useEffect(() => {
    async function fetchData() {
      const data = await apiCaller.getFungibleActionsByAddress(
        1,
        evtAddr,
        0,
        20
      )

      data.forEach(raw => {
        const name = get(raw, 'name')
        const from = get(raw, 'data.from')
        const to = get(raw, 'data.to')
        const number = get(raw, 'data.number', '0.00000 S#1').split(' ')[0]

        // only match tx that from `evt_swap_addr` and to `target addr` and amount within 3 evt difference
        if (
          name === 'transferft' &&
          from === EVT_SWAP_ADDR &&
          to === evtAddr &&
          Number(number) > convertedAmount - 3 &&
          Number(number) < convertedAmount + 3
        ) {
          setEvtTx(get(raw, 'trx_id'))
        }
      })
    }
    fetchData()
  }, [evtAddr])

  if (coin !== EVT_COIN_NAME) {
    return <p>This hash is not a Evt Swap transaction.</p>
  }

  return (
    <List dense>
      <ListItem dense disableGutters>
        <ListItemText
          primary={`Evt ${t('ADDRESS_TO')}`}
          secondary={<TruncateTextWithTooptip text={evtAddr} len={12} />}
        />
        <ListItemSecondaryAction>
          {isEvtAddrValid ? (
            <CheckCircleIcon titleAccess="Valid" />
          ) : (
            <ErrorIcon titleAccess="Invalid" />
          )}
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem dense disableGutters>
        <ListItemText primary={t('AMOUNT')} secondary={coin} />
        <ListItemSecondaryAction>{convertedAmount}</ListItemSecondaryAction>
      </ListItem>
      <ListItem dense disableGutters>
        <ListItemText
          primary={t('STATUS')}
          secondary={
            evtTx ? (
              <a target="__blank" href={`https://evtscan.io/trx/${evtTx}`}>
                {t('CONFIRMED_ON_EVERITOKEN')}
              </a>
            ) : (
              t('UNCONFIRMED_OR_NOTFOUND')
            )
          }
        />
        <ListItemSecondaryAction>
          {evtTx ? (
            <TruncateTextWithTooptip text={evtTx || ''} len={7} />
          ) : (
            <SearchingIcon />
          )}
        </ListItemSecondaryAction>
      </ListItem>
    </List>
  )
}

export default function DexOverview() {
  const { t } = useTranslation()
  const [binanceTx, setBinanceTx] = React.useState('')
  const { data, error, loading, getData } = useBinanceTxHash()

  function handleAddressChange(ev: React.ChangeEvent<HTMLInputElement>) {
    setBinanceTx(ev.target.value)
  }

  function handleSubmit() {
    getData(binanceTx)
  }

  return (
    <NavigationLayout
      title={t('DEX_TITLE')}
      renderLeft={() => <ConnectedNavigationBackButton />}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: 16,
          width: '100%',
        }}
      >
        <div style={{ height: 325, width: 400 - 32, overflow: 'hidden' }}>
          <Typography variant="caption">
            You can use this page to gain more insight on a swap transaction of{' '}
            <b>EVT-49B</b> occurred on Binance Dex chain by providing{' '}
            <b>transaction hash</b>.
          </Typography>
          {loading ? (
            <Loader />
          ) : data ? (
            <Transaction data={data} error={error} />
          ) : (
            <FormControl fullWidth margin="normal">
              <InputLabel htmlFor="binance-tx">
                {t('BINANCE_TX_INPUT')}
              </InputLabel>
              <Input
                id="binace-tx"
                value={binanceTx}
                onChange={handleAddressChange}
                inputProps={{
                  style: {
                    fontSize: '0.7rem',
                    fontFamily: 'Roboto Mono',
                  },
                  spellCheck: false,
                }}
              />
            </FormControl>
          )}
        </div>

        <div>
          <Divider />
          <Button
            variant="contained"
            color="primary"
            size="large"
            disabled={binanceTx.length === 0}
            onClick={handleSubmit}
          >
            {t('BINANCE_CHECK_TX_BTN')}
          </Button>
        </div>
      </div>
    </NavigationLayout>
  )
}
