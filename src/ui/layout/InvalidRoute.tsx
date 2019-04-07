import * as React from 'react'
import { Link as MDLink, Typography, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  text-align: center;
`

const RouterLink = (props: any) => <Link to="/" {...props} />

export default (props: { message: string }) => (
  <Container>
    <Typography variant="h6" color="textSecondary">
      {props.message}
    </Typography>
    <MDLink component={RouterLink} block>
      <Button color="primary" variant="contained">
        Back to Home
      </Button>
    </MDLink>
  </Container>
)
