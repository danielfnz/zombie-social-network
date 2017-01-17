(function() {
	'use strict';

	angular
	.module('app.painel.troca')
	.controller('trocaController', trocaController);

	function trocaController($scope,NgMap,PainelService,$rootScope,localStorageService,Flash,$location,$anchorScroll) { 

		//Declaração de variaveis utilizadas no painel de troca
		$scope.pontosCompra =0; 
		$scope.pontosPagamento =0; 
		$scope.trocaPerson = {};
		$scope.itemsCompra = [
		{name:'Water', count:0},
		{name:'Food', count:0},
		{name:'Medication', count:0},
		{name:'Ammunition', count:0}
		];
		$scope.itemsPagamento = [
		{name:'Water', count:0},
		{name:'Food', count:0},
		{name:'Medication', count:0},
		{name:'Ammunition', count:0}
		];

		//Busca na API os items atuais do sobrevivente autenticado
		PainelService.GetMyItems().then(function(items){
			$scope.inventario = items;
			$scope.meusPontosTotais = 0;

			angular.forEach(items, function(value, key) {
				$scope.meusPontosTotais += (value.item.points * value.quantity);
			});
		});

		//Busca todos os sobreviventes para utilizar na busca por nomes
		PainelService.GetAllSobreviventes().then(function(sobreviventes){
			$scope.todosSobreviventes = sobreviventes;
		});

		//Adicona na view os quantos pontos os items irão custar
		$scope.addPontosCompra = function(item){
			switch(item) {
				case 'Water': {
					$scope.pontosCompra +=4; 
					break;
				}
				case 'Food': {
					$scope.pontosCompra +=3; 
					break;
				}
				case 'Medication': {
					$scope.pontosCompra +=2; 
					break;
				}
				case 'Ammunition': {
					$scope.pontosCompra +=1; 
					break;
				}
			}
		};

		//Adicona na view os quantos pontos totais no pagamento
		$scope.addPontosPagamento= function(item){
			switch(item) {
				case 'Water': {
					$scope.pontosPagamento +=4; 
					break;
				}
				case 'Food': {
					$scope.pontosPagamento +=3; 
					break;
				}
				case 'Medication': {
					$scope.pontosPagamento +=2; 
					break;
				}
				case 'Ammunition': {
					$scope.pontosPagamento +=1; 
					break;
				}
			}
		};

		//Limpa items da area de troca
		$scope.limparItems = function(){    
			$scope.itemsCompra = [
			{name:'Water', count:0},
			{name:'Food', count:0},
			{name:'Medication', count:0},
			{name:'Ammunition', count:0}
			];
			$scope.itemsPagamento = [
			{name:'Water', count:0},
			{name:'Food', count:0},
			{name:'Medication', count:0},
			{name:'Ammunition', count:0}
			];
			$scope.pontosCompra =0; 
			$scope.pontosPagamento =0; 
		};

		//Função que realiza a troca de items entre sobreviventes
		$scope.realizarTroca =  function realizarTroca() {	
		//Variaveis locais	
		var data = {};
		var itemsCompra = "";
		var itemsPagamento = "";
		var meuNome = localStorageService.get('user').name;

		//Verifica se selecionou alum sobrevivente para troca
		if($scope.trocaPerson.nome!=null) {
		//Obetem o id desse sobrevivente	
		var idPerson = $scope.trocaPerson.nome.location.replace('http://zssn-backend-example.herokuapp.com/api/people/','');
		
		//Transforma os items atualizado na forma esperada pela API
		angular.forEach($scope.itemsCompra, function(value, key) {
			if(value.count!=0)	itemsCompra+=(value.name+':'+value.count+';');
		});			
		angular.forEach($scope.itemsPagamento, function(value, key) {
			if(value.count!=0)	itemsPagamento+=(value.name+':'+value.count+';');
		});	

		//Data post montado, pronto para ser enviado pelo service
		data = {person_id:idPerson, consumer:{name:meuNome,pick:itemsCompra,payment:itemsPagamento}};

		//Chama o service responsavel por realizar a troca
		PainelService.RealizarTroca(data).then(function(data){
			if(data==""){
				//Troca realizada com sucesso!
				var message = '<strong> Parabens! A troca de items foi um sucesso!</strong> ';
	        	Flash.create('success', message, 0, {class: 'custom-class', id: 'mensagem'}, true);
			}
			else {
				//Falha na troca
			 	var message = '<strong> Ops, não foi possivel realizar a troca dos items!</strong> ';
        		Flash.create('danger', message, 0, {class: 'custom-class', id: 'mensagem'}, true);
			}
				//Focus na mensagem
			  	$location.hash('mensagem');
      			$anchorScroll();
		});
		}		
		//Caso o usuário não tenha selecionado um sobrevivente para realizar a troca, emite esse erro
		else {
			 	var message = '<strong> Você esqueceu de selecionar o sobrevivente!</strong> ';
    			Flash.create('danger', message, 0, {class: 'custom-class', id: 'mensagem'}, true);
    			//Focus na mensagem
    			$location.hash('mensagem');
      			$anchorScroll();
		}
		};
	}

})();