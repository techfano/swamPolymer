define(['app'], function (app) {
    app.register.controller('LoginCtrl',['$scope','$resource','$resourceService','$location', function ($scope,$resource,resourceService,$location) {

		$scope.toastLogin={
			open: false,
			text: ''
		}    	

        $scope.getLogin=function(user){

        	if(user.name && user.password){

            	var auth = $resource('http://localhost:4000/api/auth/login/'+user.name+'/'+user.password);

            	$scope.loading=true;
        	
        	    auth.get(function(auth){
              
    		        localStorage.setItem("token", auth.token);
		           	$location.path('/dashboard');
		           	
	            },function(error){

		           	delete $scope.loading;
		           	$scope.toastLogin.open = true;
		           	$scope.toastLogin.text = error.data

	            });

	         }

        };

    }]);

});
