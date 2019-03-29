import { applyMiddleware, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";

import rootReducer from "./reducer";
import rootSaga from "./saga";

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];

  if (process.env.NODE_ENV === `development`) {
    const { logger } = require(`redux-logger`);

    middlewares.push(logger);
  }

  const enhancer = compose(applyMiddleware(...middlewares));
  const store = createStore(rootReducer, enhancer);

  if (process.env.NODE_ENV === `development`) {
    window.store = store;
  }

  sagaMiddleware.run(rootSaga);

  return store;
}
