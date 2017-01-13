(function() {
    'use strict';

angular
    .module('app.inicio')
    .controller('inicioController', inicioController);

function inicioController($scope,NgMap) { 

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

  var map;
  NgMap.getMap().then(function(map) {
    $scope.map = map;
  });
   $scope.placeMarker = function(e) {
    var marker = new google.maps.Marker({position: e.latLng, map: $scope.map});
    $scope.map.panTo(e.latLng);
    console.log(e.latLng.toString());
  }
}

})();