import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import createStore from "./store";
import App from "./ui/App";
import "./main.css";

const { store, persistor } = createStore();

class Root extends React.PureComponent {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    );
  }
}

render(<Root />, document.getElementById("app"));
