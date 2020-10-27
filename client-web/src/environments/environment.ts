// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  //baseurl : "https://moez-delevery.herokuapp.com/",
  //domain : "moez-delevery.herokuapp.com/",
  baseurl: "http://localhost:3000/",
  domain: "localhost:3000/",

  firebaseConfig: {
    apiKey: "AIzaSyCJa6L5G8q0v4TFx1e2X2nMydvRgZZeB1U",
    authDomain: "moez-website.firebaseapp.com",
    databaseURL: "https://moez-website.firebaseio.com",
    projectId: "moez-website",
    storageBucket: "moez-website.appspot.com",
    messagingSenderId: "110686260782",
    appId: "1:110686260782:web:af05701a4c00af966199bf",
    measurementId: "G-X6GW2ZEWDT",
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
