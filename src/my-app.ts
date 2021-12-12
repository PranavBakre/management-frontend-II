import {inject} from "aurelia";
import { routes } from "aurelia-direct-router";
import LandingPage from "routes/landing";
import LoginPage from "routes/login";
import DashboardPage from "routes/dashboard";
import { Store } from "@aurelia/store-v1";
import { State } from "store/initial-state";
import { login, logout, restoreAuthState } from "store/actions";
@routes([
  { path: "", title: "Home Page", component: LandingPage },
  { path: "/login", title: "Login", component: LoginPage },
  { path: "/app", title: "Dashboard", component: DashboardPage },
])
@inject(Store)
export class MyApp {
  
  constructor(store: Store<State>){
    store.registerAction("login",login);
    store.registerAction("logout",logout);
    store.registerAction("restoreAuthState",restoreAuthState);
  }
}
