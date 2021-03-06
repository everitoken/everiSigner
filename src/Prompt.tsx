import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import Container from './ui/presentational/Container'
import createStore from './store'
import saga from './store/saga/'
import SignatureRequest from './ui/layout/SignatureRequest'
import provider from './store/provider'
import { getLang } from './store/getter'
import i18n from './i18n'

const { store, persistor } = createStore(saga)

persistor.subscribe(() => {
  const { lang } = getLang(store.getState())
  i18n.changeLanguage(lang)
})

// init store provider, pass store instance
provider.init(store)

class Prompt extends React.PureComponent {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Container>
            <SignatureRequest />
          </Container>
        </PersistGate>
      </Provider>
    )
  }
}

render(<Prompt />, document.getElementById('app'))
