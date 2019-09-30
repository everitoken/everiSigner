import * as React from 'react'
import NetworkSelect from '../presentational/NetworkSelect'
import MainLayout, { TopActionBar } from '../presentational/MainLayout'
import { RouteComponentProps, withRouter } from 'react-router'
import NetworkContextProvider from '../../context/Network'

type PropTypes = {
  children: React.ReactNode
}

function AccountBarLayout(props: PropTypes & RouteComponentProps) {
  return (
    <MainLayout
      renderHead={() => (
        <TopActionBar
          renderMiddle={() => (
            <NetworkContextProvider>
              <NetworkSelect />
            </NetworkContextProvider>
          )}
          onLogoClick={() => null}
          onMoreClick={() => props.history.push('/settings')}
        />
      )}
    >
      {props.children}
    </MainLayout>
  )
}

export default withRouter(AccountBarLayout)
