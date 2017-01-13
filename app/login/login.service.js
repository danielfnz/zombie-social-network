(function () {
    'use strict';
    
    angular
    .module('app.login')
    .factory('LoginService', LoginService);
    
    function LoginService($http, $rootScope, localStorageService) {
        var service = {};
        
        service.GetAll = GetAll;
        service.GetById = GetById;
        service.Create = Create;
        service.Update = Update;
        service.SetCredenciais = SetCredenciais;
        service.ResetCredenciais = ResetCredenciais;
        
        return service;
        
        function GetAll() {
            return $http.get('http://zssn-backend-example.herokuapp.com/api/people').then(handleSuccess, handleError('Error getting all users'));
        }
        
        function GetById(id) {
            return $http.get('http://zssn-backend-example.herokuapp.com/api/people/'+id).then(handleSuccess, handleError('Error getting user by id'));
        }
        
        function Create(user) {
            return $http.post('http://zssn-backend-example.herokuapp.com/api/people', {name:user.nome,age:user.age,gender:user.gender,lonlat:user.lonlat,items:user.itemns}).then(handleSuccess, handleError('Error creating user'));
        }
        
        function Update(user) {
            return $http.patch('http://zssn-backend-example.herokuapp.com/api/'+user.id, {name:user.nome,age:user.age,gender:user.gender,lonlat:user.lonlat}).then(handleSuccess, handleError('Error updating user'));
        } 
        
        // private functions
        
        function handleSuccess(res) {
            return res.data;
        }
        
        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }

        function SetCredenciais(username) {   
            localStorageService.set('user', username);           
        } 

        function ResetCredenciais() {   
            localStorageService.clearAll();             
        } 
    }
    
})();