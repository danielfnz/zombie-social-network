(function() {
	'use strict';

	angular.module('app', [
		'ngRoute',
		'app.inicio',
		'app.cadastro',
		'app.login',
		'app.painel'
		
		])
    .config(configRotas)
    .run(runConfig);

	function configRotas($routeProvider) { 
		$routeProvider
		.when("/", {
			templateUrl : "app/inicio/inicio.view.html",
			controller:"inicioController",
			requerAutenticacao: false
		})
		.when("/cadastro", {
			templateUrl : "app/cadastro/cadastro.view.html",
			controller:"cadastroController",
			requerAutenticacao: false
		})
		.when("/painel", {
			templateUrl : "app/painel/painel.view.html",
			controller:"painelController",
			requerAutenticacao: true
		})
		.when("/painel/reportar", {
			templateUrl : "app/painel/reportar/reportar.view.html",
			controller:"reportarController",
			requerAutenticacao: true
		})
		.when("/painel/trocaritem", {
			templateUrl : "app/painel/troca/trocaritem.view.html",
			controller:"trocaController",
			requerAutenticacao: true
		})

		 .otherwise({redirectTo:'/'});
	}

	function runConfig($rootScope, $route, $routeParams, $location,LoginService) { 

		$rootScope.$on('$routeChangeStart',function(angularEvent, newUrl){
		//Verifica se a pagina requer autenticação	
		if(newUrl.requerAutenticacao) {
			//Se o usuário não estiver autenticado, ele é redirecionado para a pagina inicial
			if(LoginService.GetAutenticado()!=true){
				$location.path('/'); 
			}
		}
		});
	}


})();