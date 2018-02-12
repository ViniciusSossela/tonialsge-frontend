'use strict';

angular.module('myApp.produto', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/produto', {
      templateUrl: 'ui/produto/view.html',
      controller: 'ProdutoCtrl'
    });
  }])

  .controller('ProdutoCtrl', ['$scope', 'ProdutoService', function ($scope, ProdutoService) {

    $scope.tabelasPreco = [
      {
        id: 1,
        nomeTabelaPreco: 'Tabela RS/Sul',
        preco: 0,
      },
      {
        id: 2,
        nomeTabelaPreco: 'Tabela RS/Norte',
        preco: 0,
      },
      {
        id: 3,
        nomeTabelaPreco: 'Tabela SP/Norte',
        preco: 0,
      }
    ]


    class ProdutoCallback {
      constructor() {
      }

      onSuccess(produto) {
        alert(produto);
      }
    }

    $scope.salvarProduto = function() {
      ProdutoService.cadastrarProduto('prod 1', new ProdutoCallback())
    }

  }]);