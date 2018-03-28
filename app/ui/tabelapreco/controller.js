'use strict';

angular.module('myApp.tabelapreco', ['ngRoute', 'ui.router'])
  .config(['$routeProvider', '$stateProvider', function ($routeProvider, $stateProvider) {

    $stateProvider
      .state('tonial.tabelapreco', {
        cache: false,
        url: '/tabelapreco',
        views: {
          'pageContent': {
            templateUrl: 'ui/tabelapreco/view.html',
            controller: 'TabelaPrecoCtrl'
          }
        }
      });
  }])

  .controller('TabelaPrecoCtrl', ['$scope', '$http', 'hexafy', 'TabelaPrecoService', function ($scope, $http, hexafy, TabelaPrecoService) {

    $scope.tabelaPreco = {
      nome: "",
      descricao: ""
    }


    class TabelaPrecoCallback {
      constructor() {
      }

      onSuccess(tabelaPreco) {
        alert("Tabela de preço cadastrada com sucesso");
      }
    }

    $scope.salvarTabelaPreco = function () {
      TabelaPrecoService.save($scope.tabelaPreco, new TabelaPrecoCallback())
    }

  }]);