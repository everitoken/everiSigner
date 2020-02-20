import * as React from 'react'
import styled from 'styled-components'
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress'

const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  flex: 1;
`

function Loader() {
  return (
    <LoaderContainer>
      <CircularProgress disableShrink />
    </LoaderContainer>
  )
}

export default Loader
