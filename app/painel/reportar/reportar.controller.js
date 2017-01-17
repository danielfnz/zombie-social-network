(function() {
    'use strict';

angular
    .module('app.painel.reportar')
    .controller('reportarController', reportarController);

function reportarController($scope,NgMap,PainelService,$mdDialog) { 
  
  //Declaração do model de reportar usuario
  $scope.sobrevivente = {};

  //Busca na API todos os sobreviventes para que seja possivel realizar uma busca por nome
  //Utilizado para reportar sobrevivente infectado
  PainelService.GetAllSobreviventes().then(function(sobreviventes){
  $scope.todosSobreviventes = sobreviventes;
  });

  //Função para reportar um sobrevivente com suspeita de infeção pelo virus
  $scope.reportarInfectado = function reportarInfectado(data){
   //Verifica se esqueceu de escolher o sobrevivente infectado
  if(data.Infectado!=null) {
    //Captura o id do sobrevivente suspeito selecionado pela busca
    var id = data.Infectado.location.replace('http://zssn-backend-example.herokuapp.com/api/people/','');
    //Chama o service responsavel por reportar sobrevivente infectado
    PainelService.ReportarInfectado(id).then(function(response){
      if(response) {

      $mdDialog.show(
          $mdDialog.alert()
          .clickOutsideToClose(true)
          .title('Falha em reporar infectado')
          .textContent('Você ja reportou esse sobrevivente antes!')
          .ok('Ok')
            // You can specify either sting with query selector
            .openFrom('#left')
            // or an element
            .closeTo(angular.element(document.querySelector('#right')))
        );
      }
      else {
        $mdDialog.show(
          $mdDialog.alert()
          .clickOutsideToClose(true)
          .title('Sucesso')
          .textContent('Sobrevivente com suspeita de contaminação reportado com sucesso!')
          .ok('Ok')
            // You can specify either sting with query selector
            .openFrom('#left')
            // or an element
            .closeTo(angular.element(document.querySelector('#right')))
        );
      }
    });
  }
  //Se esqueceu de escolher o sobrevivente infectado, exibe o alerta
  else {
    $mdDialog.show(
      $mdDialog.alert()
      .clickOutsideToClose(true)
      .title('Falha em reporar infectado')
      .textContent('Você esqueceu de selecionar o sobrevivente!')
      .ok('Ok')
            // You can specify either sting with query selector
            .openFrom('#left')
            // or an element
            .closeTo(angular.element(document.querySelector('#right')))
    );
   }
  } 
}

})();