import React from "react";
import { Provider } from "react-redux";

import store from "./redux/store/index";

import DashboardLayout from "./layouts/Dashboard";
import Default from "./pages/dashboards/Default";

const App = () => (
  <Provider store={store}>
    <DashboardLayout>
      <Default/>
    </DashboardLayout>
  </Provider>
);

export default App;
