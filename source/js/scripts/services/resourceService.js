define(['app'], function (app) {

	app.service('$resourceService', ['resourceServiceConfig', '$resource', function (config, $resource) {

		this.resourceAssembly=function(path,params,actions){

			var resource = $resource(config.baseUrl+path,params,actions);

			return resource;
			
		};


		

	}]);

})