import Button from '@material-ui/core/Button'
import * as React from 'react'
import { withRouter } from 'react-router-dom'
import { WithRouterType } from '../../types'
import Logo from '../presentational/Logo'
import MainLayout, { HeaderTitle } from '../presentational/MainLayout'
import FlexContainer from '../presentational/FlexContainer'
import { Typography } from '@material-ui/core'

export type PropTypes = {} & WithRouterType

class GetStarted extends React.PureComponent<PropTypes> {
  public render() {
    return (
      <MainLayout
        renderHead={() => <HeaderTitle title="Welcome to EveriSigner" />}
      >
        <FlexContainer justifyContent="space-evenly" alignItems="center">
          <Logo />
          <div style={{ textAlign: 'center' }}>
            <Typography variant="body2">
              Decentralized signature, identity and authentication system for
              everiToken public chain.
            </Typography>
          </div>
          <Button
            color="primary"
            variant="contained"
            size="large"
            onClick={() => this.props.history.push('/wallet/decide')}
          >
            GET STARTED
          </Button>
        </FlexContainer>
      </MainLayout>
    )
  }
}

export default withRouter(GetStarted)
