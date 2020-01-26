import Button from '../presentational/InlineButton'
import * as React from 'react'
import { useHistory } from 'react-router-dom'
import Logo from '../presentational/Logo'
import FlexContainer from '../presentational/FlexContainer'
import { Typography } from '@material-ui/core'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

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
  const { t } = useTranslation()

  return (
    <FlexContainer justifyContent="space-evenly" alignItems="center">
      <Logo />
      <Container>
        <Typography variant="body2">{t('GET_STARTED_DESCRIPTION')}</Typography>
        <Button
          color="primary"
          variant="contained"
          size="large"
          onClick={() => history.push('/wallet/setpassword')}
        >
          {t('GET_STARTED')}
        </Button>
      </Container>
    </FlexContainer>
  )
}

export default GetStarted
