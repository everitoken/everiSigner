import * as React from 'react'
import { connect } from 'react-redux'
import { fetchOwnedTokens } from '../action'
import { getOwnedTokensByPublicKey } from '../../store/getter'
import NFTList, { PropTypes } from '../presentational/NFTList'
import styled from 'styled-components'
import { Typography } from '@material-ui/core'

const Container = styled.div`
  height: 426px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-self: stretch;
`

type OwnProps = {
  publicKey: string
  title: string
}

type ConnectedProps = {
  onMount: (publicKeys: string[]) => ReturnType<typeof fetchOwnedTokens>
}

class NFTListScreen extends React.PureComponent<
  OwnProps & ConnectedProps & PropTypes
> {
  componentWillMount() {
    this.props.onMount([this.props.publicKey])
  }

  render() {
    return (
      <Container>
        <Typography variant="h6" style={{ padding: '16px 0 4px 16px' }}>
          {this.props.title}
        </Typography>
        <NFTList data={this.props.data} fetching={this.props.fetching} />
      </Container>
    )
  }
}

export default connect(
  getOwnedTokensByPublicKey,
  { onMount: fetchOwnedTokens }
)(NFTListScreen)
