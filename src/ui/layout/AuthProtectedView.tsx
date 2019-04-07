import * as React from 'react'
import { connect } from 'react-redux'
import { getAuthenticatedStatus } from '../../store/getter'
import { AppState } from '../../store/reducer'
import { isFunction, omit } from 'lodash'
import { ValidAuthenticatedStatus } from '../../types'

type PropTypes = {
  status: ValidAuthenticatedStatus
  children: ({
    status,
  }: {
    status: ValidAuthenticatedStatus
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
}))(AuthProtectedView)
