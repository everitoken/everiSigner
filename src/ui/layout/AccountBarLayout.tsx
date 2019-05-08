import * as React from 'react'
import { getNetworks } from '../../store/getter'
import NetworkSelect from '../presentational/NetworkSelect'
import { connect } from 'react-redux'
import MainLayout, { TopActionBar } from '../presentational/MainLayout'

const ConnectedNetworkSelect = connect(
  getNetworks,
  { onSelect: () => alert('fei') }
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
            onLogoClick={() => alert('logo clicked')}
            onMoreClick={() => alert('more clicked')}
          />
        )}
      >
        {this.props.children}
      </MainLayout>
    )
  }
}
