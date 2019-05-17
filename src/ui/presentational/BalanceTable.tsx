import * as React from 'react'
import {
  IconButton,
  List,
  ListItem,
  CircularProgress,
  Grid,
  Link,
} from '@material-ui/core'
import MonoText from './MonospaceText'
import FlexContainer from './FlexContainer'
import ExploreIcon from '@material-ui/icons/Explore'
import { BalanceType } from '../../types'

export type PropTypes = {
  balances: BalanceType[]
  fetching: boolean
  showLink?: boolean
}

export default class BalanceTable extends React.PureComponent<PropTypes> {
  static defaultProps = {
    showLink: false,
  }

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
          minHeight: '120px',
          maxHeight: '207px',
          overflowY: 'auto',
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
                {this.props.showLink ? (
                  <Grid item>
                    <IconButton>
                      <Link
                        color="inherit"
                        href={`https://evtscan.io/fungible/${balance.id}`}
                        target="__blank"
                      >
                        <ExploreIcon />
                      </Link>
                    </IconButton>
                  </Grid>
                ) : null}
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
