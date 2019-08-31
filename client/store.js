
import { createStore } from "redux";

const initialState = {
	sidebarIsOpen: true
};

function reducer(state = initialState, actions) {
	switch (actions.type) {
		case 'TOGGLE_SIDEBAR':
			return {
				...state,
				sidebarIsOpen: !state.sidebarIsOpen
			};
		default:
			return state;
	}
}

const store = createStore(
	reducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
