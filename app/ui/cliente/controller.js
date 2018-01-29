'use strict';

angular.module('myApp.cliente', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/cliente', {
    templateUrl: 'ui/cliente/view.html',
    controller: 'ClienteCtrl'
  });
}])

.controller('ClienteCtrl', ['$scope','$http','hexafy', function($scope, $http, hexafy) {
  $scope.username = "testeee";

  $http.get('http://52.207.215.106:8080/greeting').
  then(function(response) {
      $scope.greeting = response.data;
      alert($scope.greeting)
  });

  $scope.reset = function() {
    alert($scope.username);
  };

  //alert(hexafy.myFunc())
  
}]);