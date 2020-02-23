import * as React from 'react'
import { AccountStateType } from '../../store/reducer/accounts'
import { removeAccount } from '../action'
import styled from 'styled-components'
import { RouteComponentProps } from 'react-router'
import { Tooltip, List } from '@material-ui/core'
import QR from '../presentational/QR'
import { compose } from 'redux'
import FlexContainer from '../presentational/FlexContainer'

import { ListItemText } from '@material-ui/core'
import CustomListItem from '../presentational/CustomListItem'
import DeleteIcon from '@material-ui/icons/Delete'
import { connect } from 'react-redux'
import { getMainAccount } from '../../store/getter'
import Divider from '../presentational/Divider'
import KeyIcon from '@material-ui/icons/VpnKey'
import SendIcon from '@material-ui/icons/CallMade'
import ReceiveIcon from '@material-ui/icons/CallReceived'
import EncryptIcon from '@material-ui/icons/EnhancedEncryption'
import StakeIcon from '@material-ui/icons/SwapVert'
import { useCopyToClipboard } from '../../hooks/componentHooks'
import { useTranslation } from 'react-i18next'

type PropTypes = {
  account: AccountStateType
  onAccountRemove: typeof removeAccount
}

const QRContainer = styled.div`
  width: 150px;
  height: 150px;
  margin-top: 4px;
  display: flex;
  flex-direction: column;
`
function AccountOverview(props: PropTypes & RouteComponentProps) {
  const { account } = props
  const { t } = useTranslation()
  const [, handleCopy] = useCopyToClipboard(t('COPY_ADDRESS_SUCCESSFUL'))

  return (
    <FlexContainer alignItems="center">
      <Tooltip title={t('CLICK_QR_TO_COPY')} enterDelay={400}>
        <QRContainer>
          <QR data={account.publicKey} width={150} onClick={handleCopy} />
        </QRContainer>
      </Tooltip>
      <span style={{ fontFamily: 'Roboto Mono', padding: 8 }}>
        {account.publicKey}
      </span>
      <Divider />
      <List style={{ width: '100%', maxHeight: '220px', overflow: 'auto' }}>
        <CustomListItem
          onClick={() => props.history.push('/home/transferft')}
          LeftIcon={SendIcon}
        >
          <ListItemText
            primary={t('TRANSFERFT')}
            secondary={t('TRANSFERFT_SECONDARY_TEXT')}
          />
        </CustomListItem>
        <CustomListItem
          onClick={() => props.history.push('/home/payee')}
          LeftIcon={ReceiveIcon}
        >
          <ListItemText
            primary={t('PAYEE_CODE')}
            secondary={t('PAYEE_CODE_SECONDARY_TEXT')}
          />
        </CustomListItem>
        <CustomListItem
          onClick={() => props.history.push('/home/stake')}
          LeftIcon={StakeIcon}
        >
          <ListItemText
            primary={t('STACK_TITLE')}
            secondary={t('STACKING_DESCRIPTION')}
          />
        </CustomListItem>
        <CustomListItem
          onClick={() => props.history.push(`/account/${account.id}/key`)}
          LeftIcon={KeyIcon}
        >
          <ListItemText
            primary={t('SHOW_PRIVATE_KEY')}
            secondary={t('SHOW_PRIVATE_KEY_SECONDARY_TEXT')}
          />
        </CustomListItem>
        <CustomListItem
          onClick={() => props.onAccountRemove(account)}
          disabled={account.type === 'seed'}
          LeftIcon={DeleteIcon}
        >
          <ListItemText
            primary={t('REMOVE_ACCOUNT')}
            secondary={t('REMOVE_ACCOUNT_SECONDARY_TEXT')}
          />
        </CustomListItem>
        <CustomListItem
          onClick={() => props.history.push('/home/sign')}
          LeftIcon={EncryptIcon}
        >
          <ListItemText
            primary={t('SIGN_DATA')}
            secondary={t('ACCOUNT_SIGN_SECONDARY_TEXT')}
          />
        </CustomListItem>
      </List>
    </FlexContainer>
  )
}

const ConnectedAccountDetail = compose(
  connect(getMainAccount, { onAccountRemove: removeAccount })
)(AccountOverview)

export default ConnectedAccountDetail
