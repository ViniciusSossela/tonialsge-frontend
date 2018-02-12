'use strict';

angular.module('myApp.tabelapreco', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/tabelapreco', {
      templateUrl: 'ui/tabelapreco/view.html',
      controller: 'TabelaPrecoCtrl'
    });
  }])

  .controller('TabelaPrecoCtrl', ['$scope', '$http', 'hexafy', 'TabelaPrecoService', function ($scope, $http, hexafy, TabelaPrecoService) {

    class TabelaPrecoCallback {
      constructor() {
      }

      onSuccess(tabelaPreco) {
        alert(tabelaPreco);
      }
    }

    $scope.salvarTabelaPreco = function () {
      TabelaPrecoService.cadastrarTabelaPreco('tabela preco 1', new TabelaPrecoCallback())
    }

  }]);