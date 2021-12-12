import { dispatchify } from "@aurelia/store-v1";

import { logout, Action } from "store/actions";
export class MgmtHeader {
  logout: Action;
  constructor() {
    this.logout = dispatchify(logout);
  }

  logoutClick() {
    console.log("LOG");
    this.logout();
  };
}
