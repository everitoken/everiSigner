import * as React from 'react'
import { render } from 'react-dom'
import { Provider, connect } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import Container from './ui/presentational/Container'
import createStore from './store'
import saga from './store/saga/'
import Signing from './ui/layout/Signing'

const { store, persistor } = createStore(saga)
class Prompt extends React.PureComponent {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Container>
            <Signing />
          </Container>
        </PersistGate>
      </Provider>
    )
  }
}

render(<Prompt />, document.getElementById('app'))
