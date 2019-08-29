import React from "react";
import { Provider } from "react-redux";

import store from "./redux/store/index";
import Routes from "./routes/Routes";

const App = () => (
  <Provider store={store}>
    <Routes />
  </Provider>
);

export default App;
