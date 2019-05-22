import * as React from 'react'
import { List, ListItem, CircularProgress, Grid } from '@material-ui/core'
import MonoText from './MonospaceText'
import FlexContainer from './FlexContainer'
import { BalanceType } from '../../types'

export type PropTypes = {
  balances: BalanceType[]
  fetching: boolean
}

export default class BalanceList extends React.PureComponent<PropTypes> {
  render() {
    const { fetching, balances } = this.props
    if (fetching) {
      return (
        <FlexContainer
          alignItems="center"
          justifyContent="center"
          alignSelf="stretch"
        >
          <CircularProgress disableShrink />
        </FlexContainer>
      )
    }
    if (!fetching && balances.length === 0) {
      return (
        <FlexContainer alignItems="center" justifyContent="center">
          <p>No balance</p>
        </FlexContainer>
      )
    }

    return (
      <List
        dense
        disablePadding
        style={{
          width: '100%',
        }}
      >
        {this.props.balances.map(balance => (
          <ListItem dense key={balance.id}>
            <Grid
              container
              alignItems="center"
              justify="space-between"
              direction="row"
            >
              <Grid container spacing={8} alignItems="center" xs={6}>
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
              </Grid>
              <div>
                <MonoText>{balance.value}</MonoText>
              </div>
            </Grid>
          </ListItem>
        ))}
      </List>
    )
  }
}
