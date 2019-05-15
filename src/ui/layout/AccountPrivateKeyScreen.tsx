import * as React from 'react'
import WithAuthentication from './WithAuthentication'
import InvalidRoute from './InvalidRoute'
import FlexContainer from '../presentational/FlexContainer'
import Button from '../presentational/InlineButton'

import { NavigationLayout } from '../presentational/MainLayout'
import { ConnectedNavigationBackButton } from './NavigationButtons'
import { getPasswordProtectedView } from '../../store/getter'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import labels from '../../labels'
import PasswordProtectedView from '../presentational/PasswordProtectedView'
import { AccountStateType } from '../../store/reducer/accounts'
import { decryptAccount } from '../../service/PasswordService'
import { TextField } from '@material-ui/core'
import { copyToClipboard } from '../action'
import InfoArea from '../presentational/InfoArea'

type PropTypes = {
  account: AccountStateType | undefined
  password: string
  onCopyClicked: typeof copyToClipboard
}

type StateProps = {}

class AccountExportPrivateKeyScreen extends React.PureComponent<
  PropTypes & RouteComponentProps<{ id: string }>,
  StateProps
> {
  render() {
    return (
      <NavigationLayout
        title={labels.PRIVATE_KEY}
        renderLeft={() => <ConnectedNavigationBackButton />}
      >
        <PasswordProtectedView password={this.props.password}>
          {({ password }) => {
            if (this.props.account == null) {
              return <p>{labels.FAIL_FIND_ACCOUNT}</p>
            }

            const account = decryptAccount(password, this.props.account)

            return (
              <FlexContainer>
                <div style={{ width: '100%' }}>
                  <InfoArea>
                    <p style={{ padding: 8 }}>
                      请注意妥善保管私钥，勿泄露给其他人。
                    </p>
                  </InfoArea>
                </div>
                <FlexContainer withPadding justifyContent="space-around">
                  <TextField
                    label={labels.PRIVATE_KEY}
                    multiline
                    rows="2"
                    fullWidth
                    value={account.privateKey}
                    inputProps={{
                      style: {
                        fontSize: '0.8rem',
                        fontFamily: 'Roboto Mono',
                      },
                      spellCheck: false,
                    }}
                    variant="outlined"
                  />

                  <Button
                    style={{ marginTop: 20 }}
                    variant="contained"
                    color="primary"
                    onClick={() => this.props.onCopyClicked(account.privateKey)}
                  >
                    {labels.COPY_PRIVATE_KEY}
                  </Button>
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
  { onCopyClicked: copyToClipboard }
)(AccountExportPrivateKeyScreen)

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
