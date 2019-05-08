import * as React from 'react'
import {
  IconButton,
  List,
  ListItem,
  CircularProgress,
  Grid,
} from '@material-ui/core'
import MonoText from './MonospaceText'
import FlexContainer from './FlexContainer'
import ExploreIcon from '@material-ui/icons/Explore'
import { BalanceType } from '../../types'

export type PropTypes = {
  balances: BalanceType[]
  fetched: boolean
  showLink?: boolean
}

export default class BalanceTable extends React.PureComponent<PropTypes> {
  static defaultProps = {
    showLink: false,
  }

  render() {
    const { fetched, balances } = this.props
    if (!fetched) {
      return (
        <FlexContainer alignItems="center">
          <CircularProgress disableShrink />
        </FlexContainer>
      )
    }
    if (fetched && balances.length === 0) {
      return (
        <FlexContainer alignItems="center">
          <p>No balance</p>
        </FlexContainer>
      )
    }

    return (
      <List dense disablePadding>
        {this.props.balances.map(balance => (
          <ListItem disableGutters dense key={balance.id}>
            <Grid
              container
              alignItems="center"
              justify="space-between"
              direction="row"
            >
              <Grid container spacing={8} alignItems="center" xs={8}>
                <Grid item>
                  <img
                    style={{ marginBottom: '-5px' }}
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
                {this.props.showLink ? (
                  <Grid item>
                    <IconButton>
                      <ExploreIcon />
                    </IconButton>
                  </Grid>
                ) : null}
              </Grid>
              <Grid item xs={4}>
                <MonoText>{balance.value}</MonoText>
              </Grid>
            </Grid>
          </ListItem>
        ))}
      </List>
    )
  }
}
