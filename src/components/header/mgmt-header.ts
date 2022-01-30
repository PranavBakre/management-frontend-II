import { bindable } from "aurelia";
import { Action } from "store/actions";

export class MgmtHeader {
  @bindable logout: Action;
}
