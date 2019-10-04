import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOwnedTokens } from '../action'
import { getOwnedTokensByPublicKey } from '../../store/getter'
import NFTList from '../presentational/NFTList'
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

type PropTypes = {
  publicKey: string
  title: string
}

export default function NFTListScreen(props: PropTypes) {
  const { data, fetching } = useSelector((state: AppState) =>
    getOwnedTokensByPublicKey(state, { publicKey: props.publicKey })
  )

  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(fetchOwnedTokens([props.publicKey]))
  }, [props.publicKey])

  return (
    <Container>
      <Typography variant="h6" style={{ padding: '16px 0 4px 16px' }}>
        {props.title}
      </Typography>
      <NFTList data={data} fetching={fetching} />
    </Container>
  )
}
