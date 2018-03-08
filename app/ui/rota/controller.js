'use strict';

angular.module('myApp.rota', ['ngRoute', 'ui.router'])
  .config(['$routeProvider', '$stateProvider', function ($routeProvider, $stateProvider) {

    $stateProvider
      .state('tonial.rota', {
        cache: false,
        url: '/rota',
        views: {
          'pageContent': {
            templateUrl: 'ui/rota/view.html',
            controller: 'RotaCtrl'
          }
        }
      });
  }])

  .controller('RotaCtrl', ['$scope', '$http', 'hexafy', 'RotaService', function ($scope, $http, hexafy, RotaService) {

    $scope.rota = {
      nome: "",
      descricao: ""
    }

    class RotaCallback {
      constructor() {
      }

      onSuccess(rota) {
        alert("Rota: " + rota.nome + ", salva com sucesso");
      }
    }

    $scope.salvarRota = function () {
      RotaService.save($scope.rota, new RotaCallback())
    }

  }]);