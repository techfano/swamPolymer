define(['app'], function (app) {
    app.register.controller('DashboardCtrl',['$scope','$resource','$location', function ($scope,$resource,$location) {


        $scope.getLogout = function(){
            localStorage.removeItem('token');
            $location.path('/login');
        };
    	
    }]);

});
