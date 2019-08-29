import { combineReducers } from "redux";

import sidebar from "./sidebarReducers";
import layout from "./layoutReducer";

export default combineReducers({
  sidebar,
  layout
});
