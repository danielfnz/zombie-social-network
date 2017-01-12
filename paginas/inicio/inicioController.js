angular
    .module('zombieApp')
    .controller('inicioController', inicioController);

function inicioController($scope) { 
$scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };

}