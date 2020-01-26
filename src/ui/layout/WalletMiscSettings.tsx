import * as React from 'react'
import i18n from 'i18next'

import ConnectedNavigationBackButton from './NavigationButtons'
import { NavigationLayout } from '../presentational/MainLayout'
import ConnectedNavigationBackButton from './NavigationButtons'
import { RouteComponentProps } from 'react-router'
import labels from '../../labels'
import PasswordProtectedView from '../presentational/PasswordProtectedView'
import { exportWallet } from '../action'
import InfoArea from '../presentational/InfoArea'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import {
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
  Typography,
  MenuItem,
  Select,
} from '@material-ui/core'
import Button from '../presentational/InlineButton'
import { useSelector, useDispatch } from 'react-redux'
import { getLang } from '../../store/getter'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { setLanguage } from '../../store/action'

const Container = styled.div`
  padding: 16px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
`
const WalletMiscSettings = () => {
  const { lang } = useSelector(getLang)
  const { t } = useTranslation()
  const dispatch = useDispatch()

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target
    i18n.changeLanguage(value)
    dispatch(setLanguage(value))
  }

  return (
    <NavigationLayout
      title={t('SET_LANGUAGE')}
      renderLeft={() => <ConnectedNavigationBackButton />}
    >
      <Container>
        <div>
          <Typography variant="h6">{t('CURRENT_LANGUAGE')}</Typography>
          <Typography variant="caption">{lang}</Typography>
        </div>
        <FormControl variant="outlined">
          <Select id="language-select" value={lang} onChange={handleChange}>
            <MenuItem value={'en-US'}>English</MenuItem>
            <MenuItem value={'zh-CN'}>中文</MenuItem>
          </Select>
        </FormControl>
      </Container>
    </NavigationLayout>
  )
}

export default WalletMiscSettings
