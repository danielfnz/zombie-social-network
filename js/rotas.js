angular.module("zombieApp", ['ngRoute'])
.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "paginas/inicio/inicio.html",
        controller:"inicioController"
    })
    .when("/cadastro", {
        templateUrl : "paginas/cadastro/cadastro.html"
    })
    .when("/green", {
        templateUrl : "green.htm"
    })
    .when("/blue", {
        templateUrl : "blue.htm"
    });
    
});