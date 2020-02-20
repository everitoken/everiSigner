import * as React from 'react'
import { NavigationLayout } from '../presentational/MainLayout'
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
} from '@material-ui/core'
import Button from '../presentational/InlineButton'
import moment = require('moment')

const StyledHeaderCell = withStyles(theme => ({
  head: {
    backgroundColor: '#E6A938',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 12,
  },
}))(TableCell)

const useStyles = makeStyles({
  root: {
    fontSize: '11px',
  },
})

export default function StakeDetail() {
  const match = useRouteMatch()
  const {
    state: { share },
  } = useLocation<{ share: StakeShareType & { category: string } }>()
  const classes = useStyles()
  const { t } = useTranslation()
  const history = useHistory()

  if (!match) {
    return null
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
        <div style={{ height: 325, width: 368 }}>
          <TableContainer component={Paper}>
            <Table aria-label="Share table">
              <TableHead>
                <TableRow>
                  <StyledHeaderCell>Validator</StyledHeaderCell>
                  <StyledHeaderCell align="right">Type</StyledHeaderCell>
                  <StyledHeaderCell align="right">Fixed days</StyledHeaderCell>
                  <StyledHeaderCell align="right">Net value</StyledHeaderCell>
                  <StyledHeaderCell align="right">Amount</StyledHeaderCell>
                  <StyledHeaderCell align="right">Time</StyledHeaderCell>
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

        <div>
          <Divider />
          <Button
            variant="contained"
            color="primary"
            size="large"
            disabled={share.category === 'unstake'}
            onClick={() => history.push(`${match.path}/unstake`, { share })}
          >
            {t('STAKE_UNSTAKE_BTN')}
          </Button>
        </div>
      </div>
    </NavigationLayout>
  )
}
