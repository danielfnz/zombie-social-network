(function () {
    'use strict';
 
    angular
        .module('app.painel')
        .factory('PainelService', PainelService);
 
    function PainelService($http, $rootScope,localStorageService) {
        var service = {};
        $rootScope.meuId = localStorageService.get('user').id;
        $rootScope.meuNome = localStorageService.get('user').name;
 
        service.GetAllSobreviventes = GetAllSobreviventes;
        service.GetSobrevivente = GetSobrevivente;
        service.SetSobrevivente = SetSobrevivente;
        service.GetItems = GetItems;
        service.GetMyItems = GetMyItems;
        service.MeusDados = MeusDados;
        service.ReportarInfectado = ReportarInfectado;
        service.RealizarTroca = RealizarTroca;
  
        return service;
 
        function GetAllSobreviventes() {
            return $http.get('http://zssn-backend-example.herokuapp.com/api/people').then(handleSuccess, handleError('Error getting all users'));
        }
        function GetSobrevivente(id) {
           return $http.get('http://zssn-backend-example.herokuapp.com/api/people/'+$rootScope.meuId).then(handleSuccess, handleError('Error getting user by id'));
        }
        function SetSobrevivente(user) {
            return $http.patch('http://zssn-backend-example.herokuapp.com/api/people/'+user.id, {name:user.nome,age:user.age,gender:user.gender,lonlat:user.lonlat}).then(handleSuccess, handleError('Error updating user'));
        } 
        function GetMyItems() {
            return $http.get('http://zssn-backend-example.herokuapp.com/api/people/'+$rootScope.meuId+'/properties').then(handleSuccess, handleError('Error getting user by id'));
        }
        function GetItems(id) {
             return $http.get('http://zssn-backend-example.herokuapp.com/api/people/'+id+'/properties').then(handleSuccess, handleError('Error getting user by id'));
        }
        function MeusDados() {
            return localStorageService.get('user');
        }
        function ReportarInfectado(infected) {
            return $http.post('http://zssn-backend-example.herokuapp.com/api/people/'+$rootScope.meuId+'/report_infection', {infected:infected,id:$rootScope.meuId}).then(handleSuccess, handleError('Error creating user'));
        } 

        function RealizarTroca(data) {
               return $http.post('http://zssn-backend-example.herokuapp.com/api/people/'+data.person_id+'/properties/trade_item', data).then(handleSuccess, handleError('Error creating user'));
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