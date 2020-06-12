import { SHOW_MENU_ON_MOBILE, HIDE_MENU_ON_MOBILE } from "../constants";

const initialState = {
  isMenuOpen: false,
};

export default function mobile(state = initialState, action) {
  switch (action.type) {
    case SHOW_MENU_ON_MOBILE:
      return {
        ...state,
        isMenuOpen: true,
      };
    case HIDE_MENU_ON_MOBILE:
      return {
        ...state,
        isMenuOpen: false,
      };
    default:
      return state;
  }
}
