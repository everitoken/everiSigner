import * as React from 'react'
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import labels from '../../labels'
import styled from 'styled-components'
import { shortenAddress } from '../util'
import { AccountStateType } from '../../store/reducer/accounts'

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

class TransferFtAction extends React.PureComponent<{
  action: TransferFtActionType
}> {
  renderSummary = () => {
    const { action } = this.props
    const { abi } = action
    return (
      <React.Fragment>
        <span style={{ paddingRight: '6px' }}>{labels.TRANSFERFT}</span>
        <UnderLineSpan>{abi.number}</UnderLineSpan>
        <span style={{ padding: '0 6px' }}>{labels.TO}</span>
        <UnderLineSpan>{shortenAddress(abi.to)}</UnderLineSpan>
      </React.Fragment>
    )
  }
  render() {
    const { action } = this.props
    const { abi } = action
    return (
      <Panel summary={this.renderSummary()}>
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
}

class FallbackAction extends React.PureComponent<{ action: any }> {
  renderSummary = () => {
    const { action } = this.props
    return (
      <React.Fragment>
        <span style={{ paddingRight: '6px' }}>
          {labels.UNSUPPORTED_ACTION_NAME}
        </span>
        <UnderLineSpan>{action.actionName}</UnderLineSpan>
      </React.Fragment>
    )
  }
  render() {
    return (
      <Panel summary={this.renderSummary()}>
        <pre style={{ overflow: 'auto' }}>
          {JSON.stringify(this.props.action, null, 4)}
        </pre>
      </Panel>
    )
  }
}

type PropTypes = {
  action: SupportedActionTypes
}

class ActionPanel extends React.PureComponent<PropTypes> {
  render() {
    if (this.props.action.actionName === 'transferft') {
      return <TransferFtAction action={this.props.action} />
    }

    return <FallbackAction action={this.props.action} />
  }
}

export default ActionPanel
