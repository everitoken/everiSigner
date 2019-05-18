import * as React from 'react'
import WithAuthentication from './WithAuthentication'
import InvalidRoute from './InvalidRoute'
import FlexContainer from '../presentational/FlexContainer'

import { NavigationLayout } from '../presentational/MainLayout'
import { ConnectedNavigationBackButton } from './NavigationButtons'
import { getPasswordProtectedView } from '../../store/getter'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import labels from '../../labels'
import PasswordProtectedView from '../presentational/PasswordProtectedView'
import { copyToClipboard, exportWallet } from '../action'
import InfoArea from '../presentational/InfoArea'
import BackupIcon from '@material-ui/icons/SaveAlt'

type PropTypes = {
  password: string
  onExportWallet: typeof exportWallet
  onCopyClicked: typeof copyToClipboard
}

type StateProps = {}

class WalletExportScreen extends React.PureComponent<
  PropTypes & RouteComponentProps<{ id: string }>,
  StateProps
> {
  render() {
    return (
      <NavigationLayout
        title={labels.BACKUP_WALLET}
        renderLeft={() => <ConnectedNavigationBackButton />}
      >
        <PasswordProtectedView password={this.props.password}>
          {({ password }) => {
            return (
              <FlexContainer>
                <div style={{ width: '100%' }}>
                  <InfoArea>
                    <p style={{ padding: 8 }}>
                      {labels.GUARD_PRIVATE_KEY_SAFELY}
                    </p>
                  </InfoArea>
                </div>
                <FlexContainer
                  withPadding
                  justifyContent="center"
                  alignItems="center"
                >
                  <FlexContainer justifyContent="center" alignItems="center">
                    <FlexContainer justifyContent="center" alignItems="center">
                      <div
                        onClick={() => this.props.onExportWallet()}
                        style={{ cursor: 'pointer' }}
                      >
                        <BackupIcon style={{ fontSize: '5rem' }} />
                        <div style={{ textAlign: 'center' }}>
                          <p>{labels.BACKUP_WALLET}</p>
                        </div>
                      </div>
                    </FlexContainer>
                  </FlexContainer>
                </FlexContainer>
              </FlexContainer>
            )
          }}
        </PasswordProtectedView>
      </NavigationLayout>
    )
  }
}

const ConnectedView = connect(
  getPasswordProtectedView,
  { onExportWallet: exportWallet }
)(WalletExportScreen)

export default (props: RouteComponentProps<{ id: string }>) => (
  <WithAuthentication>
    {({ status }) => {
      if (status === 'password') {
        return <ConnectedView {...props} />
      }

      return (
        <InvalidRoute message="everiSigner needs to be unlock in order to show account list." />
      )
    }}
  </WithAuthentication>
)
