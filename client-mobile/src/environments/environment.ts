// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false ,
  baseurl : "http://localhost:3000/",
  domain : "localhost:3000/",
  // baseurl : "https://moez-delevery.herokuapp.com/",
  // domain : "moez-delevery.herokuapp.com/" ,
  firebase : {
    apiKey: "AIzaSyCekkAEC0Ds_lcsia_-SCpbZSEoibdi02o",
    authDomain: "moez-delevery.firebaseapp.com",
    databaseURL: "https://moez-delevery.firebaseio.com",
    projectId: "moez-delevery",
    storageBucket: "moez-delevery.appspot.com",
    messagingSenderId: "871401958484",
    appId: "1:871401958484:web:35439115540ad7ea0e51c1",
    measurementId: "G-76PNQ8TETK"
  
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
