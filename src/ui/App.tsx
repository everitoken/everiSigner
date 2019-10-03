import * as React from 'react'
import { withRouter, BrowserRouter as Router, Route } from 'react-router-dom'

import Start from './layout/Start'
import WalletScreen from './layout/WalletScreen'
import SettingsScreen from './layout/SettingsScreen'
import AccountScreen from './layout/AccountScreen'
import Home from './layout/Home'
import { MessageContextProvider } from '../context/Message'

class HackRedirect extends React.PureComponent<any> {
  componentDidMount() {
    this.props.history.push('/')
  }
  render() {
    return <span />
  }
}

// this is need because when browser load extension for the first time, it doesn't give a fully qualified url.
// therefore we need to force redirect to "home"
const HackRedirectWithRouter = withRouter(HackRedirect)

function App() {
  return (
    <MessageContextProvider>
      <Router>
        <HackRedirectWithRouter />
        <React.Fragment>
          <Route exact path="/" component={Start} />
          <Route path="/home" component={Home} />
          <Route path="/wallet" component={WalletScreen} />
          <Route path="/account" component={AccountScreen} />
          <Route path="/settings" component={SettingsScreen} />
        </React.Fragment>
      </Router>
    </MessageContextProvider>
  )
}

export default App
