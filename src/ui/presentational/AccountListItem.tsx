import * as React from 'react'
import { Badge, withStyles, Typography } from '@material-ui/core'
import { AccountStateType } from '../../store/reducer/accounts'
import Monospace from './MonospaceText'
import Tooltip from './Tooltip'
import styled from 'styled-components'

const defaultProps = {
  truncateLen: 7,
}

type DefaultPropsType = Readonly<typeof defaultProps>

type PropTypes = {
  account: AccountStateType
}

type StateTypes = {}

const AccountNameContainer = styled.span`
  /* padding-left: 5px; */
`

const CustomBadge = withStyles({
  badge: {
    right: '-10px',
    top: '12px',
  },
})(Badge)

export default class AccountListItem extends React.PureComponent<
  PropTypes & DefaultPropsType,
  StateTypes
> {
  static defaultProps = defaultProps

  render() {
    const { account } = this.props

    return (
      <div
        className="everitoken-mono"
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          fontSize: '13px',
          overflow: 'hidden',
        }}
      >
        <div>
          <CustomBadge
            invisible={account.type !== 'default'}
            color="secondary"
            variant="dot"
          >
            <Tooltip
              title={
                account.type === 'default'
                  ? 'Default account'
                  : 'Imported account'
              }
            >
              <AccountNameContainer>
                {this.props.account.name}
              </AccountNameContainer>
            </Tooltip>
          </CustomBadge>
          <div>
            <Tooltip title={account.publicKey}>
              <Typography component="span" variant="caption">
                <Monospace>
                  {`${account.publicKey.slice(
                    0,
                    3 + this.props.truncateLen
                  )}...${account.publicKey.slice(-this.props.truncateLen)}`}
                </Monospace>
              </Typography>
            </Tooltip>
          </div>
        </div>
      </div>
    )
  }
}
