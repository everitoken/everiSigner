import * as React from 'react'
import { Typography, CircularProgress } from '@material-ui/core'
import FlexContainer from '../presentational/FlexContainer'
import WithAuthentication from './WithAuthentication'
import Logo from '../presentational/Logo'
import LogIn from './LogIn'
import styled from 'styled-components'

const AccountSetupReminder = () => (
  <FlexContainer withPadding>
    <Logo />
    <Typography variant="body1" color="textSecondary">
      EveriSigner is not yet set up yet. There is no account configured yet.
      Please go to the everiToken extension page and finish the set up process.
    </Typography>
  </FlexContainer>
)

const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`

export default ({ children }: { children: React.ReactNode }) => (
  <WithAuthentication>
    {({ status, uiReady }) => {
      if (!uiReady) {
        return (
          <LoaderContainer>
            <CircularProgress disableShrink />
          </LoaderContainer>
        )
      }

      if (status === 'unknown') {
        return <AccountSetupReminder />
      }

      if (status === 'hash') {
        return (
            <LogIn message="Unlock to continue" />
        )
      }

      return children
    }}
  </WithAuthentication>
)
