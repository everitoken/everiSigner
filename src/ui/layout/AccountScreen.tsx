import * as React from 'react'
import MainLayout, { HeaderTitle } from '../presentational/MainLayout'
import { Route, RouteComponentProps } from 'react-router'
import AccountCreateScreen from './AccountCreateScreen'
import AccountListScreen from './AccountListScreen'

type PropTypes = {}
export default class AccountScreen extends React.PureComponent<
  PropTypes & RouteComponentProps
> {
  render() {
    const { match } = this.props
    return (
      <MainLayout renderLogo renderHead={() => <HeaderTitle title="账户" />}>
        <Route path={`${match.path}/create`} component={AccountCreateScreen} />
        <Route path={`${match.path}/list`} component={AccountListScreen} />
      </MainLayout>
    )
  }
}
