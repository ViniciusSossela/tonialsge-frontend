'use strict';

angular.module('myApp.tabelapreco', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/tabelapreco', {
    templateUrl: 'ui/tabelapreco/view.html',
    controller: 'TabelaPrecoCtrl'
  });
}])

.controller('TabelaPrecoCtrl', ['$scope','$http','hexafy', function($scope, $http, hexafy) {

    //alert(hexafy.myFunc())
  
}]);