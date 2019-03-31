import { applyMiddleware, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { persistStore, persistReducer } from "redux-persist";
import { syncStorage } from "redux-persist-webextension-storage";

import rootReducer from "./reducer";
import rootSaga from "./saga";

const persistConfig = {
  key: "root",
  storage: syncStorage,
  blacklist: ["airport"]
};

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];

  if (process.env.NODE_ENV === `development`) {
    const { logger } = require(`redux-logger`);

    middlewares.push(logger);
  }

  const enhancer = compose(applyMiddleware(...middlewares));
  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const store = createStore(persistedReducer, enhancer);
  let persistor = persistStore(store);

  if (process.env.NODE_ENV === "development") {
    window.store = store;
    window.persistor = persistor;
  }

  sagaMiddleware.run(rootSaga);

  return { store, persistor };
}
