(function () {
    'use strict';
    
    angular
    .module('app.cadastro')
    .factory('CadastroService', CadastroService);
    
    function CadastroService($http) {
        var service = {};
        
        service.Create = Create;
        
        return service;        
       
        function Create(user) {
            return $http.post('http://zssn-backend-example.herokuapp.com/api/people', user).then(handleSuccess, handleError('Error creating user'));
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