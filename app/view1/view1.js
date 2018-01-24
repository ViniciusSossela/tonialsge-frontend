'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope','$http','hexafy', function($scope, $http, hexafy) {
  
  $http.get('http://52.207.215.106:8080/greeting').
  then(function(response) {
      $scope.greeting = response.data;
      alert($scope.greeting)
  });

  //alert(hexafy.myFunc())
  
}]);