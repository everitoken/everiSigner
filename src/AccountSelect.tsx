import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import Container from './ui/presentational/Container'
import createStore from './store/index'
import saga from './store/saga/index'
import ConnectRequest from './ui/layout/ConnectRequest'
import provider from './store/provider'

const { store, persistor } = createStore(saga)

// init store provider, pass store instance
provider.init(store)

class Prompt extends React.PureComponent {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Container>
            <ConnectRequest />
          </Container>
        </PersistGate>
      </Provider>
    )
  }
}

render(<Prompt />, document.getElementById('app'))
