(function() {
    'use strict';

angular
    .module('app')
    .controller('inicioController', inicioController);

function inicioController($scope) { 

$scope.inventario = [
   {name:'agua', count:0},
   {name:'comida', count:0},
   {name:'medicamento', count:0},
   {name:'municao', count:0}
];

$scope.limparInventario = function(){    
	$scope.inventario = [
	   {name:'agua', count:0},
	   {name:'comida', count:0},
	   {name:'medicamento', count:0},
	   {name:'municao', count:0}
	];
}
}

})();