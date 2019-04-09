import { applyMiddleware, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { persistStore, persistReducer } from 'redux-persist'
import { localStorage } from 'redux-persist-webextension-storage'

import rootReducer from './reducer'
import * as PasswordService from '../service/PasswordService'

const persistConfig = {
  key: 'root',
  storage: localStorage,
  blacklist: ['airport', 'message'],
}

const isProd = process.env.NODE_ENV === 'development'

export default function configureStore(saga: any) {
  const sagaMiddleware = createSagaMiddleware()
  const middlewares = [sagaMiddleware]

  if (!isProd) {
    const { logger } = require('redux-logger')

    middlewares.push(logger)
  }

  const enhancer = compose(applyMiddleware(...middlewares))
  const persistedReducer = persistReducer(persistConfig, rootReducer)

  const store = createStore(persistedReducer, enhancer)
  let persistor = persistStore(store)

  if (isProd) {
    window.store = store
    window.persistor = persistor
    window.PasswordService = PasswordService
  }

  sagaMiddleware.run(saga)

  return { store, persistor }
}
