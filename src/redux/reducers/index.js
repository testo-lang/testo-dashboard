import { combineReducers } from "redux";

import sidebar from "./sidebarReducers";
import layout from "./layoutReducer";
import theme from "./themeReducer";

export default combineReducers({
  sidebar,
  layout,
  theme
});
