import * as React from 'react'
import Button from '@material-ui/core/Button'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { WithRouterType } from '../../types'

export type PropTypes = {} & WithRouterType

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  flex: 1;
`

class GetStarted extends React.PureComponent<PropTypes> {
  render() {
    return (
      <Container>
        <div style={{ textAlign: 'center' }}>
          <h1>Welcome to EveriSigner</h1>
          <p>
            Decentralized signature, identity and authentication system for
            everiToken public chain.
          </p>
        </div>
        <Button
          color="primary"
          variant="contained"
          size="large"
          onClick={() => this.props.history.push('/wallet-mode-decision')}
        >
          GET STARTED
        </Button>
      </Container>
    )
  }
}

export default withRouter(GetStarted)
