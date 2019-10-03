import * as React from 'react'
import {
  List,
  ListItem,
  Radio,
  Grid,
  withStyles,
  StyledComponentProps,
} from '@material-ui/core'
import MonoText from './MonospaceText'
import * as style from '../../style'
import { TokenDetail } from '../../types'

type PropTypes = {
  balances: TokenDetail[]
  selected: TokenDetail
  onSelect: (token: TokenDetail) => any
}

const styles = {
  root: {
    padding: `0 ${style.padding.standard / 2}px 0 0`,
  },
  margin: {
    margin: style.padding.standard / 2,
  },
}

function TokenBalanceSelectList(props: PropTypes & StyledComponentProps) {
  const { classes } = props
  return (
    <List>
      {props.balances.map(balance => (
        <Grid
          key={balance.id}
          container
          justify="space-between"
          alignItems="center"
          spacing={0}
        >
          <Grid item xs={12}>
            <ListItem
              role={undefined}
              divider
              disableGutters
              onClick={() => props.onSelect(balance)}
            >
              <Radio
                checked={balance.id === props.selected.id}
                className={classes && classes.root}
                tabIndex={-1}
                value={balance.name}
                name="select-token-balance"
              />
              <Grid container alignItems="center" xs={6}>
                <Grid item>
                  <img
                    style={{ marginBottom: '-5px', padding: '5px' }}
                    width="30"
                    src={balance.logoDataUri}
                    alt={balance.name}
                  />
                </Grid>
                <Grid item>
                  <div>
                    <MonoText>{balance.name}</MonoText>
                  </div>
                  <div>
                    <MonoText>{`(#${balance.id})`}</MonoText>
                  </div>
                </Grid>
              </Grid>
              <div>
                <MonoText>{balance.value}</MonoText>
              </div>
            </ListItem>
          </Grid>
        </Grid>
      ))}
    </List>
  )
}

export default withStyles(styles)(TokenBalanceSelectList)
