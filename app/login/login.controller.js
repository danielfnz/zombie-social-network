(function() {
	'use strict';

	angular
	.module('app.login')
	.controller('loginController', loginController);

function loginController($scope,LoginService,$location,$rootScope,localStorageService) { 
	$scope.login =  function login(user) {
		LoginService.GetById(user.identificacao).then(function(data) {
			if (!data.message) { 
				LoginService.SetCredenciais(data);
				$location.path('/painel');
			} else {

			}
		});
	}
	
	$scope.logado = localStorageService.get('user');

	$scope.deslogar = function deslogar(){
		localStorageService.clearAll(); 
		$location.path('/');
	}


}

})();