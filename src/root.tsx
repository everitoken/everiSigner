import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import Container from './ui/presentational/Container'

import createStore from './store'
import App from './ui/App'
import rootSaga from './store/saga'
import provider from './store/provider'

const { store, persistor } = createStore(rootSaga)

// init store provider, pass store instance
provider.init(store)

class Root extends React.PureComponent {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Container>
            <App />
          </Container>
        </PersistGate>
      </Provider>
    )
  }
}

render(<Root />, document.getElementById('app'))
