import { inject, IRouteViewModel, Params } from "aurelia";
import { ApiClient } from "services/api-client";
import { Action, login } from "store/actions";
import {dispatchify} from "@aurelia/store-v1";
import { IRouter } from "aurelia-direct-router";

@inject(ApiClient, IRouter)
export class LoginPage implements IRouteViewModel {
  apiClient: ApiClient;
  router: IRouter
  login: Action
  constructor(apiClient: ApiClient, router: IRouter) {
    this.apiClient = apiClient;
    this.router = router;
    this.login = dispatchify(login);
  }

  

  load = (params: Params) => {
    if (params.code)
      this.apiClient
        .post("/auth/login", JSON.stringify({ code: params.code }))
        .then(async (response) => {
          const jsonResponse = await response.json();
          if (response.ok) {
            return jsonResponse;
          }
          Promise.reject(jsonResponse);
        })
        .then((response) => this.login(response))
        .then(() => {
          this.router.load("/app",{
            replace: true
          })
        })
        .catch((error) => console.log(error));
  };
}
