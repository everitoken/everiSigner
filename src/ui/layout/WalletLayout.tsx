import * as React from 'react'
import { Route, RouteComponentProps, withRouter } from 'react-router-dom'
import WalletCreate from './WalletCreate'
import WalletModeDecision from './WalletModeDecision'
import MainLayout, { HeaderTitle } from '../presentational/MainLayout'
import FlexContainer from '../presentational/FlexContainer'
import WalletImport from './WalletImport'

type PropTypes = {}

class WalletLayout extends React.PureComponent<
  PropTypes & RouteComponentProps
> {
  render() {
    const { match } = this.props
    return (
      <MainLayout
        renderLogo
        renderHead={() => <HeaderTitle title="Wallet Settings" />}
      >
        <FlexContainer justifyContent="space-evenly" alignItems="center">
          <Route path={`${match.path}/decide`} component={WalletModeDecision} />
          <Route path={`${match.path}/create`} component={WalletCreate} />
          <Route path={`${match.path}/import`} component={WalletImport} />
        </FlexContainer>
      </MainLayout>
    )
  }
}

export default withRouter(WalletLayout)
