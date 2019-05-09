import * as React from 'react'
import { getNetworks } from '../../store/getter'
import NetworkSelect from '../presentational/NetworkSelect'
import { connect } from 'react-redux'
import MainLayout, { TopActionBar } from '../presentational/MainLayout'
import { networkSelect } from '../../store/action'

const ConnectedNetworkSelect = connect(
  getNetworks,
  { onSelect: networkSelect }
)(NetworkSelect)

type PropTypes = {
  children: React.ReactNode
}

export default class AccountBarLayout extends React.PureComponent<PropTypes> {
  render() {
    return (
      <MainLayout
        renderHead={() => (
          <TopActionBar
            renderMiddle={() => <ConnectedNetworkSelect />}
            onLogoClick={() => null}
            onMoreClick={() => null}
          />
        )}
      >
        {this.props.children}
      </MainLayout>
    )
  }
}
