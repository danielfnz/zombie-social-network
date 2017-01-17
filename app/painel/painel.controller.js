(function() {
    'use strict';

angular
    .module('app.painel')
    .controller('painelController', painelController);

function painelController($scope,NgMap,PainelService,$rootScope, $mdDialog) { 
 
  //Busca dados do usuario logado
  PainelService.GetSobrevivente().then(function(items){
      $scope.meusdados = items;

      //Posição posicaoAtual do sobrevivente para utilizar no marcador no mapa
      if(items.lonlat!=null){
        $scope.posicaoAtual = $scope.meusdados.lonlat.replace('POINT (','').replace(')','').replace(' ',',');
      }
      else {        
        $mdDialog.show(
          $mdDialog.alert()
            .clickOutsideToClose(true)
            .title('Atualização necessaria')
            .textContent('Por favor, atualize sua localização atual')
            .ok('Ok')
            // You can specify either sting with query selector
            .openFrom('#left')
            // or an element
            .closeTo(angular.element(document.querySelector('#right')))
        );
        $scope.posicaoAtual = ("0,0");
     }
  });
  
  //Busca na API os items do inventario do sobrevivente
  PainelService.GetMyItems().then(function(items){
   $rootScope.inventario = items;
    angular.forEach(items, function(value, key) {
      $scope.meusPontosTotais += (value.item.points * value.quantity);
    });
  });

//===================Mapa de localização atual=========================
  $scope.render = true;
  $scope.show = true;
  $scope.latitude = "";
  $scope.longitude = "";  

  //Inicia o mapa
  $scope.$on('mapInitialized', function(evt, evtMap) {
  $scope.map = evtMap

  //Inicia o marcador
  $scope.marker = new google.maps.Marker({position: evt.latLng, map: $scope.map});

  //Função chamada para marcar a nova posição no mapa de localização atual
  $scope.click = function(evt) {
    $scope.show = false;
    $scope.latitude = evt.latLng.lat().toPrecision(8);
    $scope.longitude  = evt.latLng.lng().toPrecision(8);
    $scope.marker.setPosition(evt.latLng);
    $scope.map.panTo(evt.latLng);
    $scope.map.setZoom(8);       
    }
  });
  //=====================================================================

  //Função para atualizar a posição no mapa de localização
  $scope.atualizarPerfil = function atualizarPerfil(){
    //Posição no formato esperado pela API
    $scope.meusdados.lonlat = "POINT ("+$scope.latitude+" "+$scope.longitude+")";
    $scope.posicaoAtual = $scope.latitude+","+$scope.longitude;
    //Chama o service responsavel por atualizar a posição
    PainelService.SetSobrevivente($scope.meusdados).then(function(response){
      if(response.lonlat!=null) {
        //Informa o sucesso na atualização da posição
        $mdDialog.show(
          $mdDialog.alert()
            .clickOutsideToClose(true)
            .title('Sucesso')
            .textContent('Posição atual atualizada com sucesso!')
            .ok('Ok')
            // You can specify either sting with query selector
            .openFrom('#left')
            // or an element
            .closeTo(angular.element(document.querySelector('#right')))
        );
      }
      else {
        //Informa a falha na atualização da posição
          $mdDialog.show(
          $mdDialog.alert()
            .clickOutsideToClose(true)
            .title('Ocorrou algum erro')
            .textContent('Falha ao atualizar posição atual')
            .ok('Ok')
            // You can specify either sting with query selector
            .openFrom('#left')
            // or an element
            .closeTo(angular.element(document.querySelector('#right')))
        );
      }
    });
  }
}

})();