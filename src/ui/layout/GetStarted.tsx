import Button from '@material-ui/core/Button'
import * as React from 'react'
import { withRouter } from 'react-router-dom'
import { WithRouterType } from '../../types'
import Container from '../presentational/FlexContainer'
import Logo from '../presentational/Logo'

export type PropTypes = {} & WithRouterType

class GetStarted extends React.PureComponent<PropTypes> {
  public render() {
    return (
      <Container>
        <Logo />
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
