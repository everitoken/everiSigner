import { applyMiddleware, compose, createStore } from "redux";

import rootReducer from "./reducer";

export default function configureStore() {
  const middlewares = [];

  if (process.env.NODE_ENV === `development`) {
    const { logger } = require(`redux-logger`);

    middlewares.push(logger);
  }

  const enhancer = compose(applyMiddleware(...middlewares));
  const store = createStore(rootReducer, enhancer);

  if (process.env.NODE_ENV === `development`) {
    window.store = store;
  }

  return store;
}
