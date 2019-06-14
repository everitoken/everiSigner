import * as React from 'react'
import { Dialog, DialogContent, IconButton } from '@material-ui/core'
import { AccountStateType } from '../../store/reducer/accounts'
import AccountSelectList from './AccountSelectList'
import labels from '../../labels'
import { APP_BAR_HEIGHT } from '../../style'
import { HeaderTitle } from './MainLayout'
import CloseIcon from '@material-ui/icons/Close'
import * as style from '../../style'
import Divider from './Divider'

type PropTypes = {
  selected: AccountStateType
  accounts: AccountStateType[]
  children: ({ handleOpen }: { handleOpen: () => void }) => React.ReactNode
  onSelect: (account: AccountStateType) => void
  onAccountMoreClicked?: (account: AccountStateType) => void
  detailComponent?: React.ReactNode
}

type StateTypes = {
  selected: AccountStateType
  open: boolean
}

export default class AccountSelect extends React.PureComponent<
  PropTypes,
  StateTypes
> {
  state = {
    selected: this.props.selected,
    open: false,
  }
  handleOpen = () => {
    this.setState({ open: true })
  }
  handleClose = () => {
    this.setState({ open: false })
  }
  handleSelect = (account: AccountStateType) => {
    this.setState({ selected: account, open: false })
    if (this.state.selected.id !== account.id) {
      this.props.onSelect(account)
    }
  }

  renderSelectAccount = () => {
    if (!this.state.open) {
      return null
    }

    return (
      <Dialog fullScreen open={this.state.open} onClose={this.handleClose}>
        <div
          style={{
            padding: `0 ${style.padding.standard}px`,
            height: APP_BAR_HEIGHT,
            display: 'flex',
            alignContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <HeaderTitle title={labels.ACCOUNT_SELECT} />
          <IconButton onClick={this.handleClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <Divider />
        <DialogContent>
          <AccountSelectList
            accounts={this.props.accounts}
            selected={this.state.selected}
            onSelect={this.handleSelect}
            onMoreClicked={this.props.onAccountMoreClicked || undefined}
          />
          {this.props.detailComponent}
        </DialogContent>
      </Dialog>
    )
  }

  render() {
    return (
      <React.Fragment>
        {this.renderSelectAccount()}
        {this.props.children({ handleOpen: this.handleOpen })}
      </React.Fragment>
    )
  }
}
