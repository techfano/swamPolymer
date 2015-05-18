define(['angularAMD', 'angular-route','angular-resource'], function (angularAMD) {
  
  var app = angular.module("webapp", ['ngRoute','ngResource']);

  app.config(function ($routeProvider,$httpProvider) {

    $routeProvider
    .when("/dashboard", angularAMD.route({
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl',
        controllerUrl: 'controller/dashboard'
    }))
  
    .when("/login", angularAMD.route({
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerUrl: 'controller/login'
    }))
    
    .otherwise({redirectTo: "/login"});

    $httpProvider.interceptors.push(['$q', '$location', function($q, $location) {
        return {
                'request': function (config) {
                    config.headers = config.headers || {};
                    if (localStorage.getItem("token")) {
                        config.headers.Authorization = localStorage.getItem("token");
                    }
                    return config;
                },
                'responseError': function(response) {
                    if(response.status === 401 || response.status === 403) {
                        $location.path('/login');
                    }
                    return $q.reject(response);
                }
            };
        }]);
    
    });

    app.run( function( $rootScope ,$resource, $location) {
    

        var checkingSession = function(){

            var token=localStorage.getItem('token');

            var verify = $resource('http://localhost:4000/api/auth/verify/'+token);

            if(token){

              verify.get(function(verify){
                  $location.path('/dashboard');
              },function(error){
                  $location.path('/login');
              });              

            }else{
              $location.path('/login');
            }

        };
        
        $rootScope.$on('$routeChangeStart',function(obj,data){
            
           
        });

    })

  angularAMD.bootstrap(app);

  return app;
});