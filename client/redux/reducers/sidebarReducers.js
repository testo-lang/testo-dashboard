import * as types from "../constants";

const initialState = {
  isOpen: true,
  isSticky: false
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.SIDEBAR_VISIBILITY_TOGGLE:
      return {
        ...state,
        isOpen: !state.isOpen
      };
    case types.SIDEBAR_VISIBILITY_SHOW:
      return {
        ...state,
        isOpen: true
      };
    case types.SIDEBAR_VISIBILITY_HIDE:
      return {
        ...state,
        isOpen: false
      };

    default:
      return state;
  }
}
