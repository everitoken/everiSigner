import * as React from 'react'
import FlexContainer from './FlexContainer'
import SuccessIcon from '@material-ui/icons/CheckCircle'

type PropTypes = {
  children: React.ReactNode
}

export default function SuccessInfoLayout(props: PropTypes) {
  return (
    <FlexContainer justifyContent="center" alignItems="center">
      <FlexContainer justifyContent="center" alignItems="center">
        <SuccessIcon style={{ color: 'green', fontSize: '4rem' }} />
        <div style={{ textAlign: 'center', padding: '8px 16px' }}>
          {props.children}
        </div>
      </FlexContainer>
    </FlexContainer>
  )
}
