import * as React from 'react'
import * as Evtjs from 'evtjs'
import { NavigationLayout, HeaderTitle } from '../presentational/MainLayout'
import ConnectedNavigationBackButton from './NavigationButtons'
import FlexContainer from '../presentational/FlexContainer'
import { Route, useHistory, useRouteMatch } from 'react-router-dom'
import MoreIcon from '@material-ui/icons/ChevronRight'
import CloseIcon from '@material-ui/icons/Close'
import {
  List,
  ListItem,
  ListItemSecondaryAction,
  IconButton,
  FormControl,
  InputLabel,
  Input,
  Divider,
  ListItemText,
  Dialog,
  DialogContent,
} from '@material-ui/core'
import InfoArea from '../presentational/InfoArea'
import { get } from 'lodash'
import Button from '../presentational/InlineButton'
import AddIconButton from '../presentational/AddIconButton'
import { useTranslation } from 'react-i18next'
import useValidator from '../../hooks/useValidator'
import useNetwork from '../../hooks/useNetworks'
import Loader from '../presentational/Loader'
import { padding, APP_BAR_HEIGHT } from '../../style'
import { ValidatorType } from '../../types'
import { getEvtEndpoint } from '../util'
import { useSelector } from 'react-redux'
import { getDecryptedMainAccount } from '../../store/getter'
import MessageContext from '../../context/Message'

function ValidatorList() {
  const [selection, setSelection] = React.useState<ValidatorType | null>(null)
  const { t } = useTranslation()
  const [, getSelected] = useNetwork([])
  const network = getSelected()

  const { data, loading } = useValidator(network)
  const validators: ValidatorType[] = get(data, 'validators', [])

  if (loading) {
    return <Loader />
  }

  if (validators.length === 0) {
    return (
      <div style={{ padding: '2rem', margin: '0 auto' }}>
        <p>{t('VALIDATOR_LIST_EMPTY')}</p>
      </div>
    )
  }

  return (
    <div style={{ flex: '1 1 auto', height: '476px', overflow: 'auto' }}>
      <List>
        {validators.map((validator, i) => (
          <React.Fragment key={validator.name}>
            <ListItem
              role={undefined}
              button
              onClick={() => setSelection(validator)}
            >
              <ListItemText
                primary={validator.name}
                secondary={
                  <span className="everitoken-mono">
                    {` (${validator.current_net_value})`}
                  </span>
                }
              />
              <ListItemSecondaryAction>
                <IconButton
                  aria-label="More"
                  onClick={() => setSelection(validator)}
                >
                  <MoreIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>

            {i !== validators.length - 1 ? (
              <Divider variant="fullWidth" />
            ) : null}
          </React.Fragment>
        ))}
      </List>
      <Dialog fullScreen open={selection !== null}>
        <div
          style={{
            padding: `0 ${padding.standard}px`,
            height: APP_BAR_HEIGHT,
            display: 'flex',
            alignContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <HeaderTitle title={t('VALIDATOR_DETAIL')} />
          <IconButton onClick={() => setSelection(null)}>
            <CloseIcon />
          </IconButton>
        </div>
        <Divider />
        <DialogContent>
          <List dense>
            {selection &&
              Object.keys(selection).map(prop => (
                <ListItem key={prop} role={undefined}>
                  <ListItemText
                    primary={t(`VALIDATOR_DYNAMIC_${prop.toUpperCase()}`)}
                  />
                  <ListItemSecondaryAction>
                    <span className="everitoken-mono">
                      <b>{selection[prop]}</b>
                    </span>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
          </List>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function ValidatorCreate() {
  const [validatorName, setValidatorName] = React.useState('')
  const [commission, setCommission] = React.useState('0')
  const [loading, setLoading] = React.useState(false)
  const { t } = useTranslation()
  const { show } = React.useContext(MessageContext)
  const history = useHistory()

  const [, getSelected] = useNetwork([])
  const network = getSelected()
  const { account } = useSelector(getDecryptedMainAccount)

  if (!account) {
    return <p>Main account is not setup</p>
  }

  function handleValidatorNameChange(ev: React.ChangeEvent<HTMLInputElement>) {
    setValidatorName(ev.target.value)
  }

  function handleCommissionChange(ev: React.ChangeEvent<HTMLInputElement>) {
    setCommission(ev.target.value)
  }

  const handleCreateValidator = () => {
    const apiCaller = new Evtjs.default({
      endpoint: getEvtEndpoint(network),
      keyProvider: [account.privateKey],
    })

    setLoading(true)

    apiCaller
      .pushTransaction(
        new Evtjs.EvtAction(
          'newvalidator',
          {
            creator: account.publicKey,
            name: validatorName,
            signer: account.publicKey,
            withdraw: {
              name: 'withdraw',
              threshold: 1,
              authorizers: [
                {
                  ref: '[A] ' + account.publicKey,
                  weight: 1,
                },
              ],
            },
            manage: {
              name: 'manage',
              threshold: 1,
              authorizers: [
                {
                  ref: '[A] ' + account.publicKey,
                  weight: 1,
                },
              ],
            },
            commission: commission,
          },
          '.staking',
          validatorName
        )
      )
      .then(trx => {
        setLoading(false)
        show({ message: t('VALIDATOR_ADD_SUCCESSFUL') })
        setTimeout(() => {
          history.goBack()
        }, 2000)
      })
      .catch(err => alert(err))
      .finally(() => setLoading(false))
  }

  return loading ? (
    <Loader />
  ) : (
    <FlexContainer justifyContent="space-between">
      <div style={{ width: '100%', marginBottom: 20 }}>
        <InfoArea>
          <ul>
            <li>
              Create a <i>validator</i>
            </li>
            <li>
              Specify <i>validator name</i> and <i>commission %</i>
            </li>
          </ul>
        </InfoArea>
      </div>

      <FlexContainer withPadding justifyContent="space-between">
        <>
          <FormControl fullWidth>
            <InputLabel htmlFor="validator-name">
              {t('VALIDATOR_NAME')}
            </InputLabel>
            <Input
              required
              id="validator-name"
              type="text"
              value={validatorName}
              onChange={handleValidatorNameChange}
            />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel htmlFor="validator-commission">
              {`${t('VALIDATOR_COMMISSION')} (%)`}
            </InputLabel>
            <Input
              required
              id="validator-commission"
              value={commission}
              onChange={handleCommissionChange}
            />
          </FormControl>
          <Button
            color="primary"
            variant="contained"
            onClick={handleCreateValidator}
          >
            {t('VALIDATOR_CREATE')}
          </Button>
        </>
      </FlexContainer>
    </FlexContainer>
  )
}

function ValidatorScreen() {
  const { t } = useTranslation()
  const history = useHistory()
  const match = useRouteMatch()

  if (!match) {
    return null
  }

  return (
    <NavigationLayout
      title={t('VALIDATOR_LIST')}
      renderLeft={() => <ConnectedNavigationBackButton />}
      renderRight={() => (
        <AddIconButton
          onAdd={() => history.push('/settings/validator/create')}
        />
      )}
    >
      <Route exact path={`${match.path}/`} component={ValidatorList} />
      <Route path={`${match.path}/create`} component={ValidatorCreate} />
    </NavigationLayout>
  )
}

export default ValidatorScreen
