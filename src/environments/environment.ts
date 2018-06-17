// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  token_auth_config: {
    apiBase: 'https://protected-atoll-70549.herokuapp.com' 
    // 'http://0.0.0.0:3000'
  },
  GOOGLE_SECRET_KEY : 'AIzaSyA3L19brZhfBlO-6HcK7obD4rG_GvnWsaU',
  aws_bucket: "enotikbucket",
  aws_id: "AKIAIQPDE5FZ2K3QVQIQ",
  aws_key: "amrbaTIOcwzVwzs2exkCYhR8tT32LltbEPNqIkqy"
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
