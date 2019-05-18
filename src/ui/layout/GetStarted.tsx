import Button from '../presentational/InlineButton'
import * as React from 'react'
import { withRouter } from 'react-router-dom'
import { WithRouterType } from '../../types'
import Logo from '../presentational/Logo'
import MainLayout, { HeaderTitle } from '../presentational/MainLayout'
import FlexContainer from '../presentational/FlexContainer'
import { Typography } from '@material-ui/core'
import styled from 'styled-components'

export type PropTypes = {} & WithRouterType

const Container = styled.div`
  text-align: center;
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  flex: 0.6;
`
class GetStarted extends React.PureComponent<PropTypes> {
  public render() {
    return (
      <MainLayout
        renderHead={() => <HeaderTitle title="Welcome to EveriSigner" />}
      >
        <FlexContainer justifyContent="space-evenly" alignItems="center">
          <Logo />
          <Container>
            <Typography variant="body2">
              Decentralized signature, identity and authentication system for
              everiToken public chain.
            </Typography>
            <Button
              color="primary"
              variant="contained"
              size="large"
              onClick={() => this.props.history.push('/wallet/decide')}
            >
              GET STARTED
            </Button>
          </Container>
        </FlexContainer>
      </MainLayout>
    )
  }
}

export default withRouter(GetStarted)
