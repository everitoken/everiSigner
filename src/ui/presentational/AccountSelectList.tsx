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
import * as style from '../../style'

type PropTypes = {
  accounts: AccountStateType[]
  selected: AccountStateType
  onSelect: (account: AccountStateType) => any
  onMoreClicked?: (account: AccountStateType) => any
}

const styles = {
  root: {
    padding: `0 ${style.padding.standard / 2}px 0 0`,
  },
  margin: {
    margin: style.padding.standard / 2,
  },
}

function AccountSelectList(props: PropTypes & StyledComponentProps) {
  const { classes } = props
  return (
    <List>
      {props.accounts.map(account => (
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
              disableGutters
              onClick={() => props.onSelect(account)}
            >
              <Radio
                checked={account.id === props.selected.id}
                className={classes && classes.root}
                tabIndex={-1}
                value={account.name}
                name="select-account"
              />
              <AccountListItem account={account} />

              {props.onMoreClicked != null ? (
                <ListItemSecondaryAction>
                  <IconButton
                    aria-label="More"
                    onClick={() =>
                      props.onMoreClicked && props.onMoreClicked(account)
                    }
                    className={classes && classes.margin}
                  >
                    <MoreIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              ) : null}
            </ListItem>
          </Grid>
        </Grid>
      ))}
    </List>
  )
}

export default withStyles(styles)(AccountSelectList)
