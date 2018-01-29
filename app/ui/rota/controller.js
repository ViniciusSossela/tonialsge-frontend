'use strict';

angular.module('myApp.rota', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/rota', {
    templateUrl: 'ui/rota/view.html',
    controller: 'RotaCtrl'
  });
}])

.controller('RotaCtrl', ['$scope','$http','hexafy', function($scope, $http, hexafy) {

    //alert(hexafy.myFunc())
  
}]);