import Aurelia, { StyleConfiguration } from 'aurelia';
import { MyApp } from './my-app';

//import tailwind
import tailwindCSS from "tailwindcss/tailwind.css"


Aurelia
  .register(StyleConfiguration.shadowDOM({
    sharedStyles: [tailwindCSS]
  }))
  .app(MyApp)
  .start();
