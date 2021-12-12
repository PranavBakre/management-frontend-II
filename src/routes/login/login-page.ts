import { inject, IRouteViewModel, Params } from "aurelia";
import { ApiClient } from "services/api-client";
import { Action, login } from "store/actions";
import {dispatchify} from "@aurelia/store-v1";

@inject(ApiClient)
export class LoginPage implements IRouteViewModel {
  apiClient: ApiClient;
  login: Action
  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;
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
        .catch((error) => console.log(error));
  };
}
