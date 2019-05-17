import * as React from 'react'
import {
  List,
  ListItem,
  Radio,
  Grid,
  withStyles,
  StyledComponentProps,
  IconButton,
  ListItemSecondaryAction,
} from '@material-ui/core'
import AccountListItem from './AccountListItem'
import { AccountStateType } from '../../store/reducer/accounts'
import MoreIcon from '@material-ui/icons/AccountBalanceWallet'

type PropTypes = {
  accounts: AccountStateType[]
  selected: AccountStateType
  onSelect: (account: AccountStateType) => any
  onMoreClicked: (account: AccountStateType) => any
}

const styles = {
  root: {
    padding: '0 8px 0 0',
  },
  margin: {
    margin: 8,
  },
}

class AccountSelectList extends React.PureComponent<
  PropTypes & StyledComponentProps
> {
  render() {
    const { classes } = this.props
    return (
      <List>
        {this.props.accounts.map(account => (
          <Grid
            key={account.id}
            container
            justify="space-between"
            alignItems="center"
            spacing={0}
          >
            <Grid item xs={12}>
              <ListItem
                role={undefined}
                disableRipple
                divider
                disableTouchRipple
                disableGutters
                onClick={() => this.props.onSelect(account)}
              >
                <Radio
                  checked={account.id === this.props.selected.id}
                  className={classes && classes.root}
                  tabIndex={-1}
                  value={account.name}
                  name="select-account"
                />
                <AccountListItem account={account} />

                <ListItemSecondaryAction>
                  <IconButton
                    aria-label="More"
                    onClick={() => this.props.onMoreClicked(account)}
                    className={classes && classes.margin}
                  >
                    <MoreIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </Grid>
          </Grid>
        ))}
      </List>
    )
  }
}
export default withStyles(styles)(AccountSelectList)
