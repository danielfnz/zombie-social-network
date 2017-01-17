(function() {
    'use strict';

angular
    .module('app.inicio')
    .controller('inicioController', inicioController)
    .filter('porcentagem', ['$filter', function ($filter) {
      return function (input, decimals) {
      return $filter('number')(input * 100, decimals) + '%';
    };
    }]);

function inicioController($scope,NgMap,InicioService) { 

  //===================================Reports=============================================

  //Porcentagem de SobreviventesInfectados
  InicioService.GetSobreviventesInfectados().then(function(items){
   $scope.SobreviventesInfectados = items.report.average_infected;
  });

  //Porcentagem de Sobreviventes Nao Infectados
  InicioService.GetSobreviventesNaoInfectados().then(function(items){
   $scope.SobreviventesNaoInfectados = items.report.average_healthy;
  });

  //Quantidade de Pontos Perdidos
  InicioService.GetPontosPerdidos().then(function(items){
   $scope.PontosPerdidos = items.report.total_points_lost;
  });

  //Quantidade de items por pessoa
  InicioService.GetQuantidadeItemPorPessoa().then(function(items){
   $scope.QuantidadeItemPorPessoa = items.report.average_items_quantity_per_healthy_person;
   $scope.QuantidadeItemPorPessoaInfectada = items.report.average_items_quantity_per_person;
  });
  //==========================================================================================

  //===========================MAPA DE SOBREVIVENTES INDENTIFICADOS===========================
  
  //Busca todos os sobreviventes para serem mostrados no mapa de sobreviventes identificados
  InicioService.GetLocalizacaoAll().then(function(items){
   $scope.sobreviventes = items;
  });

  //Função responsavel por inicializar o mapa
  $scope.$on('mapInitialized', function(evt, evtMap) {
  $scope.map = evtMap;
  $scope.marker = new google.maps.Marker({position: evt.latLng, map: $scope.map});
  });
  //==========================================================================================

}

})();