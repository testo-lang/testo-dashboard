
import './styles/_app.scss'

import React from "react";
import ReactDOM from "react-dom";

import store from "./store";

import { Provider } from "react-redux";
import Dashboard from "./pages/dashboard";

const App = () => (
	<Provider store={store}>
		<Dashboard/>
	</Provider>
);

ReactDOM.render(<App />, document.getElementById("root"));
