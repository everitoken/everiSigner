import * as React from 'react'
import FlexContainer from './FlexContainer'
import SuccessIcon from '@material-ui/icons/CheckCircle'

type PropTypes = {
  children: React.ReactNode
}

export default class SuccessInfoLayout extends React.PureComponent<PropTypes> {
  render() {
    return (
      <FlexContainer justifyContent="center" alignItems="center">
        <FlexContainer justifyContent="center" alignItems="center">
          <SuccessIcon style={{ color: 'green', fontSize: '4rem' }} />
          <div style={{ textAlign: 'center', padding: '8px 16px' }}>
            {this.props.children}
          </div>
        </FlexContainer>
      </FlexContainer>
    )
  }
}
