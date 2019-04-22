import * as React from 'react'
import { List, ListItem, Radio } from '@material-ui/core'
import AccountListItem from './AccountListItem'
import { AccountStateType } from '../../store/reducer/accounts'

type PropTypes = {
  accounts: AccountStateType[]
  selected: AccountStateType
  onSelect: (account: AccountStateType) => any
}

export default class AccountSelectList extends React.PureComponent<PropTypes> {
  render() {
    return (
      <List>
        {this.props.accounts.map(account => (
          <ListItem
            key={account.id}
            role={undefined}
            dense
            button
            onClick={() => this.props.onSelect(account)}
          >
            <Radio
              checked={account.id === this.props.selected.id}
              tabIndex={-1}
              value={account.name}
              name="select-account"
            />
            <AccountListItem account={account} truncateLen={12} />
          </ListItem>
        ))}
      </List>
    )
  }
}
