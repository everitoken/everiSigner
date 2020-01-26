import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import Container from './ui/presentational/Container'
import i18n from './i18n'

import createStore from './store'
import App from './ui/App'
import rootSaga from './store/saga'
import provider from './store/provider'
import { getLang } from './store/getter'

const { store, persistor } = createStore(rootSaga)

persistor.subscribe(() => {
  const { lang } = getLang(store.getState())
  i18n.changeLanguage(lang)
})

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
