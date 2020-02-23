import * as React from 'react'
import * as Evtjs from 'evtjs'
import { NavigationLayout, HeaderTitle } from '../presentational/MainLayout'
import ConnectedNavigationBackButton from './NavigationButtons'
import { useTranslation } from 'react-i18next'
import { useRouteMatch, useLocation, useHistory } from 'react-router-dom'
import { StakeShareType } from '../../types'
import {
  Divider,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  makeStyles,
  withStyles,
  Dialog,
  DialogContent,
  FormControl,
  DialogActions,
  TextField,
} from '@material-ui/core'
import Button from '../presentational/InlineButton'
import moment from 'moment'
import useNetwork from '../../hooks/useNetworks'
import { getDecryptedMainAccount } from '../../store/getter'
import { useSelector } from 'react-redux'
import { getEvtEndpoint } from '../util'
import Loader from '../presentational/Loader'
import NumberFormat from 'react-number-format'
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

const StyledHeaderCell = withStyles(theme => ({
  head: {
    backgroundColor: '#E6A938',
    color: theme.palette.common.white,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 180,
  },
}))(TableCell)

const useStyles = makeStyles({
  root: {
    fontSize: '11px',
  },
})

export default function StakeDetail() {
  const [, getSelected] = useNetwork([])
  const network = getSelected()
  const { account } = useSelector(getDecryptedMainAccount)
  const match = useRouteMatch()
  const {
    state: { share },
  } = useLocation<{ share: StakeShareType & { category: string } }>()
  const classes = useStyles()
  const { t } = useTranslation()
  const history = useHistory()
  const [loading, setLoading] = React.useState(false)
  const [amount, setAmount] = React.useState(0)
  const [showModal, toggleModal] = React.useState(false)
  const { show } = React.useContext(MessageContext)
  const unstakeStatus =
    share.category === 'stake'
      ? 'propose'
      : moment(moment())
          .subtract(7, 'days')
          .isAfter(moment(share.time))
      ? 'settle'
      : 'disable'

  const buttonStateMap = {
    propose: t('STAKE_UNSTAKE_PROPOSE_BTN'),
    settle: t('STAKE_UNSTAKE_SETTLE_BTN'),
    disable: `${t('STAKE_UNSTAKE_NEED_WAITING')} ${7 -
      Math.floor(
        moment.duration(moment().diff(moment(share.time))).asDays()
      )} ${t('DAY')}`,
  }
  if (!match) {
    return null
  }

  function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    setAmount(e.target.value)
  }

  function handleSubmit() {
    toggleModal(true)
  }

  function handleUnstake() {
    const apiCaller = new Evtjs.default({
      endpoint: getEvtEndpoint(network),
      keyProvider: [account.privateKey],
    })

    setLoading(true)

    apiCaller
      .pushTransaction(
        new Evtjs.EvtAction(
          'unstaketkns',
          {
            staker: account.publicKey,
            validator: share.validator,
            units: Number(amount),
            sym_id: 1,
            op: unstakeStatus,
          },
          '.staking',
          share.validator
        )
      )
      .then(trx => {
        setLoading(false)
        show({ message: t('UNSTAKE_SUCCESSFUL') })
        setTimeout(() => {
          history.goBack()
        }, 2000)
      })
      .catch(err => alert(err))
      .finally(() => {
        setLoading(false)
        toggleModal(false)
      })
  }

  return (
    <NavigationLayout
      title={t('STACK_DETAIL_TITLE')}
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
        <>
          <div style={{ height: 325, width: 368 }}>
            <TableContainer component={Paper}>
              <Table aria-label="Share table">
                <TableHead>
                  <TableRow>
                    <StyledHeaderCell>
                      {t('STAKE_VALIDATOR_NAME')}
                    </StyledHeaderCell>
                    <StyledHeaderCell align="right">
                      {t('STAKE_TYPE_NAME')}
                    </StyledHeaderCell>
                    <StyledHeaderCell align="right">
                      {t('STAKE_DURATION_NAME')}
                    </StyledHeaderCell>
                    <StyledHeaderCell align="right">Net value</StyledHeaderCell>
                    <StyledHeaderCell align="right">
                      {t('AMOUNT')}
                    </StyledHeaderCell>
                    <StyledHeaderCell align="right">
                      {t('TIME')}
                    </StyledHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow key={share.validator}>
                    <TableCell
                      className={classes.root}
                      component="th"
                      scope="row"
                    >
                      {share.validator}
                    </TableCell>
                    <TableCell className={classes.root} align="right">
                      {share.type}
                    </TableCell>
                    <TableCell className={classes.root} align="right">
                      {share.fixed_days}
                    </TableCell>
                    <TableCell className={classes.root} align="right">
                      {share.net_value}
                    </TableCell>
                    <TableCell className={classes.root} align="right">
                      {share.units}
                    </TableCell>
                    <TableCell
                      className={classes.root}
                      align="right"
                      title={share.time}
                    >
                      {moment(share.time).fromNow()}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <Dialog open={showModal}>
            <HeaderTitle title={share.validator} />
            <Divider />
            <DialogContent>
              {loading ? (
                <Loader />
              ) : (
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
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => toggleModal(false)} color="secondary">
                {t('CANCEL_BUTTON_TEXT')}
              </Button>
              <Button
                variant="outlined"
                onClick={handleUnstake}
                disabled={
                  Number(amount) === 0 || Number(amount) > Number(share.units)
                }
                color="primary"
              >
                {buttonStateMap[unstakeStatus]}
              </Button>
            </DialogActions>
          </Dialog>
        </>

        <div>
          <Divider />
          <Button
            variant="contained"
            color="primary"
            size="large"
            disabled={unstakeStatus === 'disable'}
            onClick={handleSubmit}
          >
            {buttonStateMap[unstakeStatus]}
          </Button>
        </div>
      </div>
    </NavigationLayout>
  )
}
