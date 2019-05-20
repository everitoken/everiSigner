import * as React from 'react'
import { AccountStateType } from '../../store/reducer/accounts'
import { copyToClipboard, removeAccount } from '../action'
import styled from 'styled-components'
import { RouteComponentProps } from 'react-router'
import {
  Tooltip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@material-ui/core'
import labels from '../../labels'
import QR from '../presentational/QR'
import { compose } from 'redux'
import FlexContainer from '../presentational/FlexContainer'

import ForwardIcon from '@material-ui/icons/ChevronRight'
import DeleteIcon from '@material-ui/icons/Delete'
import { connect } from 'react-redux'
import { getMainAccount } from '../../store/getter'
import Divider from '../presentational/Divider'
import KeyIcon from '@material-ui/icons/VpnKey'
import ReceiveIcon from '@material-ui/icons/CallReceived'
import EncryptIcon from '@material-ui/icons/EnhancedEncryption'

type PropTypes = {
  account: AccountStateType
  onQrCodeClicked: typeof copyToClipboard
  onAccountRemove: typeof removeAccount
}

const QRContainer = styled.div`
  width: 150px;
  height: 150px;
  margin-top: 4px;
  display: flex;
  flex-direction: column;
`
class AccountOverview extends React.PureComponent<
  PropTypes & RouteComponentProps
> {
  render() {
    const { account } = this.props

    return (
      <FlexContainer alignItems="center">
        <Tooltip title={labels.CLICK_QR_TO_COPY} enterDelay={400}>
          <QRContainer>
            <QR
              data={account.publicKey}
              width={150}
              onClick={this.props.onQrCodeClicked}
            />
          </QRContainer>
        </Tooltip>
        <span style={{ fontFamily: 'Roboto Mono', padding: 8 }}>
          {account.publicKey}
        </span>
        <Divider />
        <List style={{ width: '100%', maxHeight: '240px', overflow: 'auto' }}>
          <ListItem
            divider
            button
            onClick={() =>
              this.props.history.push(`/account/${account.id}/key`)
            }
          >
            <KeyIcon color="action" />
            <ListItemText
              primary={labels.SHOW_PRIVATE_KEY}
              secondary={labels.SHOW_PRIVATE_KEY_SECONDARY_TEXT}
            />
            <ListItemIcon>
              <ForwardIcon />
            </ListItemIcon>
          </ListItem>
          <ListItem
            divider
            button
            onClick={() => this.props.onAccountRemove(account)}
            disabled={account.type === 'seed'}
          >
            <DeleteIcon color="action" />
            <ListItemText
              primary={labels.REMOVE_ACCOUNT}
              secondary={labels.REMOVE_ACCOUNT_SECONDARY_TEXT}
            />
            <ListItemIcon>
              <ForwardIcon />
            </ListItemIcon>
          </ListItem>
          <ListItem
            divider
            button
            onClick={() => this.props.history.push(`/home/payee`)}
          >
            <ReceiveIcon color="action" />
            <ListItemText
              primary={labels.PAYEE_CODE}
              secondary={labels.PAYEE_CODE_SECONDARY_TEXT}
            />
            <ListItemIcon>
              <ForwardIcon />
            </ListItemIcon>
          </ListItem>
          <ListItem
            divider
            button
            onClick={() => this.props.history.push(`/home/sign`)}
          >
            <EncryptIcon color="action" />
            <ListItemText
              primary={labels.SIGN_DATA}
              secondary={labels.ACCOUNT_SIGN_SECONDARY_TEXT}
            />
            <ListItemIcon>
              <ForwardIcon />
            </ListItemIcon>
          </ListItem>
        </List>
      </FlexContainer>
    )
  }
}

const ConnectedAccountDetail = compose(
  connect(
    getMainAccount,
    { onQrCodeClicked: copyToClipboard, onAccountRemove: removeAccount }
  )
)(AccountOverview)

export default ConnectedAccountDetail
