import * as React from 'react'
import { StackShareType } from '../../types'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import Panel from './Panel'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import * as moment from 'moment'
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core'

type PropTypes = {
  shares: StackShareType[]
  title: string
}

const Header = styled.p`
  margin: 0 1rem;
`

const StyledHeaderCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
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

export default function StakeShare(props: PropTypes) {
  const { shares } = props
  const { t } = useTranslation()
  const classes = useStyles()

  const totalStakeAmount = shares.reduce((carry, curr) => carry + curr.units, 0)
  return (
    <Panel
      summary={
        <Header>
          {props.title}
          <span>
            {' '}
            ({t('STAKE_TOTAL_AMOUNT')}: {totalStakeAmount})
          </span>
        </Header>
      }
    >
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
            {shares.map((share, i) => (
              <TableRow key={`${share.validator}-${i}`}>
                <TableCell className={classes.root} component="th" scope="row">
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
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Panel>
  )
}
