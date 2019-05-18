import * as React from 'react'
import { Typography } from '@material-ui/core'
import labels from '../../labels'
import FlexContainer from '../presentational/FlexContainer'
import { connect } from 'react-redux'
import { AccountStateType } from '../../store/reducer/accounts'
import { getMainAccount } from '../../store/getter'

type FungibleOverviewPropTypes = { account: AccountStateType }

class FungibleOverview extends React.PureComponent<FungibleOverviewPropTypes> {
  render() {
    return (
      <FlexContainer>
        <Typography variant="h6" style={{ padding: '16px 0 0 16px' }}>
          {labels.FUNGIBLE_BALANCE}
        </Typography>
        <FlexContainer withPadding alignItems="center" justifyContent="center">
          <p>No token yet.</p>
        </FlexContainer>
      </FlexContainer>
    )
  }
}

export default connect(getMainAccount)(FungibleOverview)
