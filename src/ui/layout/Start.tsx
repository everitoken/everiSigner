import * as React from 'react'
import { connect } from 'react-redux'
import GetStarted from './GetStarted'
import Login from './LogIn'
import Home from './Home'
import { getStartScreenName } from '../../store/getter'
import { StartScreenNameType } from '../../types'

type StartPropTypes = {
  name: StartScreenNameType
}

class Start extends React.PureComponent<StartPropTypes> {
  render() {
    const { name } = this.props
    if (name === 'HOME') {
      return <Home />
    }

    if (name === 'LOGIN') {
      return <Login />
    }

    return <GetStarted />
  }
}

export default connect(getStartScreenName)(Start)
