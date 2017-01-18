(function() {
	'use strict';

	angular
	.module('app.login')
	.controller('loginController', loginController);

	function loginController($scope,LoginService,$location) {

		//Verifica se o usuário esta autenticado
		$scope.logado = LoginService.GetAutenticado();

		//Função responsavel por realizar o login do sobrevivente
		$scope.login =  function login(user) {
			LoginService.GetById(user.identificacao).then(function(data) {
				if (!data.message) { 		
				//Autenticado com sucesso
					LoginService.SetAutenticado(data);
					$location.path('/painel');
				} else {
				//Falha na autenticação
				}
			});
		}

		//Realiza logout do usuário
		$scope.deslogar = function deslogar(){
			LoginService.ResetAutenticado();	
		} 

	}

})();