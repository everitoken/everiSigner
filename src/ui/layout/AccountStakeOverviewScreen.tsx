import React, { Fragment, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useRouteMatch, useHistory } from 'react-router-dom'

import Button from '../presentational/InlineButton'
import { NavigationLayout } from '../presentational/MainLayout'
import ConnectedNavigationBackButton from './NavigationButtons'
import { getMainAccount } from '../../store/getter'
import useStaking from '../../hooks/useStaking'
import Loader from '../presentational/Loader'
import useNetwork from '../../hooks/useNetworks'
import { StakeRespType } from '../../types'
import {
  IconButton,
  ListItemSecondaryAction,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@material-ui/core'
import ForwardIcon from '@material-ui/icons/ChevronRight'
import NumberFormat from 'react-number-format'
import moment = require('moment')

function Overview({ stake }: { stake: StakeRespType }) {
  const { amount } = stake
  const match = useRouteMatch()
  const history = useHistory()
  const { t } = useTranslation()
  const actives = stake.stake_shares.map(share => ({
    ...share,
    category: 'stake',
    categoryLabel: t('STAKE_STATE_STAKED'),
  }))
  const pending = stake.pending_shares.map(share => ({
    ...share,
    category: 'stake',
    categoryLabel: t('STAKE_STATE_UNSTATE_PENDING'),
  }))
  const allStakings = actives.concat(pending)

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: 16,
        width: '100%',
      }}
    >
      <div style={{ height: 285, overflow: 'auto' }}>
        {allStakings.length === 0 ? (
          <p>{t('NO_STAKING_IN_PROGRESS')}</p>
        ) : (
          <List dense>
            {allStakings.map((share, i) => (
              <Fragment key={`${share.validator}-${i}`}>
                <ListItem>
                  <ListItemText
                    primary={`${share.validator} (${share.categoryLabel})`}
                    secondary={
                      <span>
                        {`${t('STAKED_AMOUNT')}: `}
                        <NumberFormat
                          className="everitoken-mono"
                          displayType={'text'}
                          value={share.units}
                        />
                        {` (${moment(share.time).fromNow()})`}
                      </span>
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="more"
                      onClick={() =>
                        history.push(`${match.path}/detail`, { share })
                      }
                    >
                      <ForwardIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                {i < allStakings.length - 1 ? <Divider /> : null}
              </Fragment>
            ))}
          </List>
        )}
      </div>

      <div>
        <Divider />
        <p>
          {`${t('AVAILABLE_TO_STAKE')}: `}
          <span className="everitoken-mono">{amount / 100000}</span>
        </p>
        <Button
          variant="contained"
          color="primary"
          size="large"
          disabled={amount === 0}
          onClick={() => history.push(`${match.path}/create`, { stake })}
        >
          {t('CREATE_STAKE_BTN')}
        </Button>
      </div>
    </div>
  )
}

export default function StakeOverview() {
  const match = useRouteMatch()
  const { t } = useTranslation()
  const { account } = useSelector(getMainAccount)
  const [, getSelected] = useNetwork([])
  const { loading, data, error } = useStaking(account, getSelected())

  const content = useMemo(() => {
    if (loading) {
      return <Loader />
    }

    if (error) {
      alert(error)
      return null
    }

    if (!data) {
      return null
    }

    return <Overview stake={data} />
  }, [loading, data])

  if (!match) {
    return null
  }

  return (
    <NavigationLayout
      title={t('STACK_OVERVIEW_TITLE')}
      renderLeft={() => <ConnectedNavigationBackButton />}
    >
      {content}
    </NavigationLayout>
  )
}
