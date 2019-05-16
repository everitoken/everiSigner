import * as React from 'react'
import { getNetworks } from '../../store/getter'
import NetworkSelect from '../presentational/NetworkSelect'
import { connect } from 'react-redux'
import MainLayout, { TopActionBar } from '../presentational/MainLayout'
import { networkSelect } from '../../store/action'
import { RouteComponentProps, withRouter } from 'react-router'

const ConnectedNetworkSelect = connect(
  getNetworks,
  { onSelect: networkSelect }
)(NetworkSelect)

type PropTypes = {
  children: React.ReactNode
}

class AccountBarLayout extends React.PureComponent<
  PropTypes & RouteComponentProps
> {
  render() {
    return (
      <MainLayout
        renderHead={() => (
          <TopActionBar
            renderMiddle={() => <ConnectedNetworkSelect />}
            onLogoClick={() => null}
            onMoreClick={() => this.props.history.push('/settings')}
          />
        )}
      >
        {this.props.children}
      </MainLayout>
    )
  }
}

export default withRouter(AccountBarLayout)
