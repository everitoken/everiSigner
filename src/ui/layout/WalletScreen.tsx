import * as React from 'react'
import { Route, RouteComponentProps, withRouter } from 'react-router-dom'
import WalletCreate from './WalletCreate'
import WalletSetpassword from './WalletSetpassword'
import WalletModeDecision from './WalletModeDecision'
import MainLayout, { HeaderTitle } from '../presentational/MainLayout'
import WalletImport from './WalletImportScreen'

type PropTypes = {}

class WalletLayout extends React.PureComponent<
  PropTypes & RouteComponentProps
> {
  render() {
    const { match } = this.props
    return (
      <MainLayout
        renderLogo
        renderHead={() => <HeaderTitle title="钱包设置" />}
      >
        <Route path={`${match.path}/decide`} component={WalletModeDecision} />
        <Route path={`${match.path}/create`} component={WalletCreate} />
        <Route path={`${match.path}/import`} component={WalletImport} />
        <Route
          path={`${match.path}/setpassword`}
          component={WalletSetpassword}
        />
      </MainLayout>
    )
  }
}

export default withRouter(WalletLayout)
