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

type PropTypes = {
  selected: AccountStateType
  accounts: AccountStateType[]
  children: ({ handleOpen }: { handleOpen: () => void }) => React.ReactNode
  onSelect: any // TODO
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
      <Dialog open={this.state.open} onClose={this.handleClose}>
        <DialogTitle>Select account</DialogTitle>
        <DialogContent>
          <List>
            {this.props.accounts.map(account => (
              <ListItem
                key={account.id}
                role={undefined}
                dense
                button
                onClick={() => this.handleSelect(account)}
              >
                <Radio
                  checked={account.id === this.state.selected.id}
                  tabIndex={-1}
                  value={account.name}
                  name="select-account"
                />
                <AccountListItem account={account} truncateLen={12} />
              </ListItem>
            ))}
          </List>
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
