import * as React from 'react'
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import styled from 'styled-components'
import { shortenAddress } from '../util'
import { useTranslation } from 'react-i18next'

interface TransferFtActionType {
  actionName: string
  abi: {
    from: string
    to: string
    number: string
    memo: string
  }
}

export type SupportedActionTypes = TransferFtActionType

const Panel = (props: {
  summary: React.ReactNode
  children: React.ReactNode
}) => (
  <ExpansionPanel
    style={{ width: '100%', fontFamily: 'Roboto Mono', fontSize: '11px' }}
  >
    <ExpansionPanelSummary
      expandIcon={<ExpandMoreIcon />}
      style={{
        padding: '0 0 0 8px',
      }}
    >
      {props.summary}
    </ExpansionPanelSummary>

    <ExpansionPanelDetails style={{ padding: '0 8px 8px 8px' }}>
      {props.children}
    </ExpansionPanelDetails>
  </ExpansionPanel>
)

const Dd = styled.dd`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 290px;
`
const UnderLineSpan = styled.span`
  text-decoration: underline;
  font-weight: bold;
`

function TransferFtAction(props: { action: TransferFtActionType }) {
  const { t } = useTranslation()
  function renderSummary() {
    const { action } = props
    const { abi } = action
    return (
      <React.Fragment>
        <span style={{ paddingRight: '6px' }}>{t('TRANSFERFT')}</span>
        <UnderLineSpan>{abi.number}</UnderLineSpan>
        <span style={{ padding: '0 6px' }}>{t('TO')}</span>
        <UnderLineSpan>{shortenAddress(abi.to)}</UnderLineSpan>
      </React.Fragment>
    )
  }

  const { action } = props
  const { abi } = action
  return (
    <Panel summary={renderSummary()}>
      <dl>
        <dt>From:</dt>
        <Dd className="truncate">{abi.from}</Dd>
        <dt>To:</dt>
        <Dd>{abi.to}</Dd>
        <dt>Amount:</dt>
        <Dd>{abi.number}</Dd>
        <dt>Message:</dt>
        <Dd>{abi.memo}</Dd>
      </dl>
    </Panel>
  )
}

function FallbackAction(props: { action: any }) {
  const { t } = useTranslation()

  function renderSummary() {
    const { action } = props

    return (
      <React.Fragment>
        <span style={{ paddingRight: '6px' }}>
          {t('UNSUPPORTED_ACTION_NAME')}
        </span>
        <UnderLineSpan>{action.actionName}</UnderLineSpan>
      </React.Fragment>
    )
  }

  return (
    <Panel summary={renderSummary()}>
      <pre style={{ overflow: 'auto' }}>
        {JSON.stringify(props.action, null, 4)}
      </pre>
    </Panel>
  )
}

type PropTypes = {
  action: SupportedActionTypes
}

function ActionPanel(props: PropTypes) {
  if (props.action.actionName === 'transferft') {
    return <TransferFtAction action={props.action} />
  }

  return <FallbackAction action={props.action} />
}

export default ActionPanel
