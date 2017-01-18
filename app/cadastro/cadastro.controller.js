(function() {
	'use strict';

	angular
	.module('app.cadastro')
	.controller('cadastroController', cadastroController);

	function cadastroController($scope,CadastroService,LoginService,$location,NgMap,$mdDialog) {	

	//Declaração do inventario
	$scope.inventario = [
	   {name:'Water', count:0},
	   {name:'Food', count:0},
	   {name:'Medication', count:0},
	   {name:'Ammunition', count:0}
	];

	//Limpa o inventario
	$scope.limparInventario = function(){    
		$scope.inventario = [
		   {name:'Water', count:0},
		   {name:'Food', count:0},
		   {name:'Medication', count:0},
		   {name:'Ammunition', count:0}
		];
	}

	//Função responsavel para cadastrar sobrevivente
 	$scope.cadastrar =  function cadastro(user) {
	    var items = "";
    	//Coloca os items no formato esperado pela api
       angular.forEach($scope.inventario, function(value, key) {
        items+=(value.name+":"+value.count+";");          
        });

       //Adiciona a localização e os items na requisição de criação
	    user.person.lonlat = $scope.localizacao;
	    user.items = items;
	   //Chama o service responsavel por cadastrar usuário
	    CadastroService.Create(user).then(function(data) {
	      if (!data.message) { 
	      	//Usuario criado
	        LoginService.SetAutenticado(data);
	        $location.path('/painel');
	      } else {
	      	//Erro na criação do usuário
	      	$mdDialog.show(
	      		$mdDialog.alert()
	      		.clickOutsideToClose(true)
	      		.title('Erro ao registrar novo sobrevivente')
	      		.textContent('Esse sobrevivente já esta cadastrado')
	      		.ok('Ok')
            // You can specify either sting with query selector
            .openFrom('#left')
            // or an element
            .closeTo(angular.element(document.querySelector('#right')))
            );
	      }
	    });
  	}

	 //===================Mapa de localização de sobrevivente=========================
	$scope.latitude = "";
	$scope.longitude = "-";

	$scope.$on('mapInitialized', function(evt, evtMap) {
	$scope.map = evtMap;
	$scope.marker = new google.maps.Marker({position: evt.latLng, map: $scope.map});
	$scope.click = function(evt) {
		$scope.latitude = evt.latLng.lat().toPrecision(8);
		$scope.longitude = evt.latLng.lng().toPrecision(8);
		$scope.marker.setPosition(evt.latLng);
		$scope.map.panTo(evt.latLng);
		$scope.map.setZoom(7);
		$scope.localizacao = "POINT ("+$scope.latitude+" "+$scope.longitude+")";
	}  
	});
	//===============================================================================

	}

})();