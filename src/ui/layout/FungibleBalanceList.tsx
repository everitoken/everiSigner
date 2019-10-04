import * as React from 'react'
import BalanceList from '../presentational/BalanceList'
import { useSelector, useDispatch } from 'react-redux'
import { fetchBalance } from '../action'
import { getBalanceByPublicKey } from '../../store/getter'
import styled from 'styled-components'
import { Typography } from '@material-ui/core'
import { AppState } from '../../store/reducer'

const Container = styled.div`
  height: 426px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-self: stretch;
`
type OwnProps = {
  publicKey: string
  title?: string
}

function BalanceListConnected(props: OwnProps) {
  const { balances, fetching } = useSelector((state: AppState) =>
    getBalanceByPublicKey(state, { publicKey: props.publicKey })
  )
  const dispatch = useDispatch()
  React.useEffect(() => {
    dispatch(fetchBalance(props.publicKey))
  }, [props.publicKey])

  return (
    <Container>
      {props.title ? (
        <Typography variant="h6" style={{ padding: '16px 0 4px 16px' }}>
          {props.title}
        </Typography>
      ) : null}
      <BalanceList {...props} balances={balances} fetching={fetching} />
    </Container>
  )
}

export default BalanceListConnected
