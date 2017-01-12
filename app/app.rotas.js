(function() {
    'use strict';

angular.module('app', ['ngRoute'])
.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "app/inicio/inicio.html",
        controller:"inicioController"
    })
    .when("/cadastro", {
        templateUrl : "/cadastro.html"
    })
    .when("/green", {
        templateUrl : "green.htm"
    })
    .when("/blue", {
        templateUrl : "blue.htm"
    });
    
});

})();