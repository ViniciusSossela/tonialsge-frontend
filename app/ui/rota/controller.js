'use strict';

angular.module('myApp.rota', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/rota', {
      templateUrl: 'ui/rota/view.html',
      controller: 'RotaCtrl'
    });
  }])

  .controller('RotaCtrl', ['$scope', '$http', 'hexafy', 'RotaService', function ($scope, $http, hexafy, RotaService) {


    class RotaCallback {
      constructor() {
      }

      onSuccess(rota) {
        alert(rota);
      }
    }

    $scope.salvarRota = function () {
      RotaService.cadastrarRota('rota 1', new RotaCallback())
    }

  }]);