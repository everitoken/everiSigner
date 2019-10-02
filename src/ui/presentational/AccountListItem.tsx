import * as React from 'react'
import { Badge, withStyles, Typography } from '@material-ui/core'
import { AccountStateType } from '../../store/reducer/accounts'
import Monospace from './MonospaceText'
import Tooltip from './Tooltip'
import styled from 'styled-components'


type PropTypes = {
  account: AccountStateType
  truncateLen?: number
}


const AccountNameContainer = styled.span`
  /* padding-left: 5px; */
`

const CustomBadge = withStyles({
  badge: {
    right: '-5px',
    top: '5px',
  },
})(Badge)

export default function({ account, ...props }: PropTypes) {
  const truncateLen = props.truncateLen || 7
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
          invisible={account.type !== 'seed'}
          color="secondary"
          variant="dot"
        >
          <Tooltip
            enterDelay={800}
            title={
              account.type === 'seed' ? 'Seed account' : 'Imported account'
            }
          >
            <AccountNameContainer>{account.name}</AccountNameContainer>
          </Tooltip>
        </CustomBadge>
        <div>
          <Tooltip enterDelay={800} title={account.publicKey}>
            <Typography component="span" variant="caption">
              <Monospace>
                {`${account.publicKey.slice(
                  0,
                  truncateLen
                )}...${account.publicKey.slice(-truncateLen)}`}
              </Monospace>
            </Typography>
          </Tooltip>
        </div>
      </div>
    </div>
  )
}
