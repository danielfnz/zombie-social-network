(function () {
    'use strict';

    angular
    .module('app.inicio')
    .factory('InicioService', InicioService);

    function InicioService($http, $rootScope,localStorageService) {
        var service = {};

        service.GetSobreviventesInfectados = GetSobreviventesInfectados;
        service.GetSobreviventesNaoInfectados = GetSobreviventesNaoInfectados;
        service.GetQuantidadeItemPorPessoa = GetQuantidadeItemPorPessoa;
        service.GetPontosPerdidos = GetPontosPerdidos;
        service.GetLocalizacaoAll = GetLocalizacaoAll;

        return service;

        function GetSobreviventesInfectados() {
            return $http.get('http://zssn-backend-example.herokuapp.com/api/report/infected').then(handleSuccess, handleError('Error getting all users'));
        }
        function GetSobreviventesNaoInfectados() {
            return $http.get('http://zssn-backend-example.herokuapp.com/api/report/non_infected').then(handleSuccess, handleError('Error getting all users'));
        }
        function GetPontosPerdidos() {
            return $http.get('http://zssn-backend-example.herokuapp.com/api/report/infected_points').then(handleSuccess, handleError('Error getting all users'));
        }
        function GetQuantidadeItemPorPessoa() {
            return $http.get('http://zssn-backend-example.herokuapp.com/api/report/people_inventory').then(handleSuccess, handleError('Error getting all users'));
        }
        function GetLocalizacaoAll() {
            return $http.get('http://zssn-backend-example.herokuapp.com/api/people').then(Localizacao, handleError('Error getting all users'));
        }


    // Função responsavel em colocar as coordenadas em formato certo para serem visualizadas pelo mapa
    function Localizacao(res) {
        var coordenadas = [];

         angular.forEach(res.data, function(value, key) {
            if(value.lonlat !=null) {
                var coodernada = value.lonlat.replace('POINT (','').replace(')','').replace(' ',',');
                coordenadas.push(coodernada);
            }
        });

        localStorageService.set('sobreviventes', coordenadas);  
         return coordenadas;
    }

     function handleSuccess(res) {
        return res.data;
    }

    function handleError(error) {
        return function () {
            return { success: false, message: error };
        };
    }
}

})();