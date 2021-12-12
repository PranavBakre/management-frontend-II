import Aurelia, {
  StyleConfiguration,
  Registration,
  HttpClient,
  IHttpClient,
} from "aurelia";
import { RouterConfiguration } from "aurelia-direct-router";
import { MyApp } from "./my-app";
import { Store, StoreConfiguration, logMiddleware, MiddlewarePlacement } from "@aurelia/store-v1";
//import tailwind
import tailwindCSS from "tailwindcss/tailwind.css";
import { ApiClient } from "services/api-client";
import { initialState } from "store/initial-state";
const aureliaApp = Aurelia.register(
  RouterConfiguration.customize({
    title: { appTitle: "${componentTitles}${appTitleSeparator}Management" },
    useDirectRouting: false,
    useUrlFragmentHash: false,
    useHref: true,
  }),
  StyleConfiguration.shadowDOM({
    sharedStyles: [tailwindCSS],
  }),
  StoreConfiguration.withInitialState(initialState),
  Registration.transient(IHttpClient, HttpClient),
  Registration.singleton(ApiClient, ApiClient)
)
  .app(MyApp)
  
  const store = aureliaApp.container.get(Store);
  store.registerMiddleware(logMiddleware, MiddlewarePlacement.After, { logType: "log" });

  
  aureliaApp.start();
