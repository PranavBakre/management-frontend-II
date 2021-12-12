import { HttpClient } from "@aurelia/fetch-client";
import { inject } from "@aurelia/kernel";

@inject(HttpClient)
export class ApiClient {
  httpClient: HttpClient;
  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
    this.httpClient.configure((config) =>
      config
        .withBaseUrl(process.env.BACKEND_URL)
        .withInterceptor({
          request: this.httpRequestInterceptor,
        })
        .rejectErrorResponses()
    );
  }

  httpRequestInterceptor = (request) => {
    const storedCredString = localStorage.getItem("mgmt:store");
    const storedCredentials = JSON.parse(storedCredString);
    const expiry = storedCredentials?.expiry;
    if (expiry && storedCredentials?.access_token) {
      if (new Date() < new Date((expiry - 30) * 1000)) {
        request.headers.set(
          "Authorization",
          `Bearer ${storedCredentials.access_token}`
        );
        return request;
      } else {
        //this.logout();
        return {};
      }
    }
    return request;
  };

  get(input: string | Request, init?: RequestInit) {
    return this.httpClient.get(input, init);
  }

  post(input: string | Request, body?: BodyInit, init?: RequestInit) {
    return this.httpClient.post(input, body, init);
  }

  put(input: string | Request, body?: BodyInit, init?: RequestInit) {
    return this.httpClient.put(input, body, init);
  }

  delete(input: string | Request, body?: BodyInit, init?: RequestInit) {
    return this.httpClient.delete(input, body, init);
  }
}
