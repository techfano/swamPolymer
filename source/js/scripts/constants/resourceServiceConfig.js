define(['app'], function (app) {

	app.constant('resourceServiceConfig',{
       baseURL:'http://localhost:4000/',
       path:{
       	'api/auth/':{
       		url:'api/auth/:user/:pass'

       	}
       }
    })  

});