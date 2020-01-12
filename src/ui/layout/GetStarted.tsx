import Button from '../presentational/InlineButton'
import * as React from 'react'
import { useHistory } from 'react-router-dom'
import Logo from '../presentational/Logo'
import FlexContainer from '../presentational/FlexContainer'
import { Typography } from '@material-ui/core'
import styled from 'styled-components'
import labels from '../../labels'

const Container = styled.div`
  text-align: center;
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  flex: 0.6;
`

function GetStarted() {
  const history = useHistory()

  return (
    <FlexContainer justifyContent="space-evenly" alignItems="center">
      <Logo />
      <Container>
        <Typography variant="body2">
          {labels.GET_STARTED_DESCRIPTION}
        </Typography>
        <Button
          color="primary"
          variant="contained"
          size="large"
          onClick={() => history.push('/wallet/setpassword')}
        >
          {labels.GET_STARTED}
        </Button>
      </Container>
    </FlexContainer>
  )
}

export default GetStarted
