require.config({

  baseUrl: "js/scripts",

  paths: {
    'angular': '../libs/angular/angular',
    'angular-route': '../libs/angular-route/angular-route',
    'angular-resource': '../libs/angular-resource/angular-resource',
    'angular-sanitize': '../libs/angular-sanitize/angular-sanitize',
    'angular-ui-route': '../libs/angular-ui-router/angular-ui-router',
    'angularAMD': '../libs/angularAMD/angularAMD',
    'directives': 'directives',
    'factories': 'factories'
  },

  shim: {
    'angularAMD': ['angular'],
    'angular-route': ['angular'],
    'angular-resource': ['angular'],
    'angular-sanitize': ['angular'],
    'angular-ui-route': ['angular']
  },

  deps: ['app',
         'constants/resourceServiceConfig',
         'services/resourceService',
         'modules/ng-polymer'
        ]
});