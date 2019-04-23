import * as React from 'react'
import { connect } from 'react-redux'
import { getAuthenticatedStatus, getUiReadyStatus } from '../../store/getter'
import { AppState } from '../../store/reducer/index'
import { isFunction, omit } from 'lodash'
import { ValidAuthenticatedStatusTypes } from '../../types'

type PropTypes = {
  status: ValidAuthenticatedStatusTypes
  uiReady: boolean
  children: ({
    status,
    uiReady,
  }: {
    status: ValidAuthenticatedStatusTypes
    uiReady: boolean
  }) => React.ReactNode
}

class AuthProtectedView extends React.PureComponent<PropTypes> {
  render() {
    if (!isFunction(this.props.children)) {
      throw new Error('Only function is supported')
    }

    return this.props.children(omit(this.props, 'children'))
  }
}

export default connect((state: AppState) => ({
  status: getAuthenticatedStatus(state),
  uiReady: getUiReadyStatus(state),
}))(AuthProtectedView)
