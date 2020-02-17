import * as React from 'react'
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

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

export default Panel
