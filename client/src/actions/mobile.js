import { SHOW_MENU_ON_MOBILE, HIDE_MENU_ON_MOBILE } from "../constants";

export function toggleMenu(isShow) {
  if (isShow) {
    return {
      type: SHOW_MENU_ON_MOBILE,
    };
  } else {
    return {
      type: HIDE_MENU_ON_MOBILE,
    };
  }
}
