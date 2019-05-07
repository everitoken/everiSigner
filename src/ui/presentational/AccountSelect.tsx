import * as React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  Radio,
} from '@material-ui/core'
import AccountListItem from './AccountListItem'
import { AccountStateType } from '../../store/reducer/accounts'
import AccountSelectList from './AccountSelectList'

type PropTypes = {
  selected: AccountStateType
  accounts: AccountStateType[]
  children: ({ handleOpen }: { handleOpen: () => void }) => React.ReactNode
  onSelect: any // TODO
  onAccountMoreClicked: (account: AccountStateType) => void
  detailComponent: React.ReactNode
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
    open: true,
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
      <Dialog
        maxWidth="xs"
        fullWidth
        open={this.state.open}
        onClose={this.handleClose}
      >
        <DialogTitle>Select account</DialogTitle>
        <DialogContent>
          <AccountSelectList
            accounts={this.props.accounts}
            selected={this.state.selected}
            onSelect={this.handleSelect}
            onMoreClicked={this.props.onAccountMoreClicked}
          />
          {this.props.detailComponent}
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
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
