import * as React from 'react'
import BalanceList, { PropTypes } from '../presentational/BalanceList'
import { connect } from 'react-redux'
import { fetchBalance } from '../action'
import { getBalanceByPublicKey } from '../../store/getter'
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
  title?: string
}

type ConnectedProps = {
  onMount: (publicKey: string) => ReturnType<typeof fetchBalance>
}

class ConnectedBalanceList extends React.PureComponent<
  OwnProps & ConnectedProps & PropTypes
> {
  componentWillMount() {
    this.props.onMount(this.props.publicKey)
  }
  render() {
    return (
      <Container>
        {this.props.title ? (
          <Typography variant="h6" style={{ padding: '16px 0 4px 16px' }}>
            {this.props.title}
          </Typography>
        ) : null}
        <BalanceList
          {...this.props}
          balances={this.props.balances}
          fetching={this.props.fetching}
        />
      </Container>
    )
  }
}

export default connect(
  getBalanceByPublicKey,
  { onMount: fetchBalance }
)(ConnectedBalanceList)
