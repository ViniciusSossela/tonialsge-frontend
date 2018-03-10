'use strict';

angular.module('myApp.produto', ['ngRoute', 'ui.router'])

  // .config(['$routeProvider', function ($routeProvider) {
  .config(['$routeProvider', '$stateProvider', function ($routeProvider, $stateProvider) {

    $stateProvider
      .state('tonial.produto', {
        cache: false,
        url: '/produto',
        views: {
          'pageContent': {
            templateUrl: 'ui/produto/view.html',
            controller: 'ProdutoCtrl'
          }
        }
      });
  }])

  .controller('ProdutoCtrl', ['$scope', 'ProdutoService', 'TabelaPrecoService', function ($scope, ProdutoService, TabelaPrecoService) {

    $scope.tabelasPreco = []
    $scope.produto = {
      nome: "",
      tabelaPrecoProduto: []
    }

    class ProdutoCallback {
      constructor() {
      }

      onSuccess(produto) {
        alert("Produto " + produto.nome + " cadastrado com sucesso.");
      }
    }

    class TabelaPrecoCallback {
      constructor() {
      }

      onSuccess(tabelas) {

        var tabelasPrecoViewModel = tabelas.map(function (tabelaPreco) {
          return {
            id: tabelaPreco.id,
            nome: tabelaPreco.nome,
            preco: 0
          }
        });
        $scope.tabelasPreco = tabelasPrecoViewModel;

      }
    }

    loadTabelasPreco();

    function loadTabelasPreco() {
      TabelaPrecoService.tabelaPrecoAll(new TabelaPrecoCallback());
    }

    $scope.salvarProduto = function () {
      angular.forEach($scope.tabelasPreco, function (tabelaPrecoVM, key) {
        $scope.produto.tabelaPrecoProduto.push({
          preco: tabelaPrecoVM.preco,
          tabelaPreco: {
            id: tabelaPrecoVM.id
          }
        })
      });
      ProdutoService.cadastrarProduto($scope.produto, new ProdutoCallback())
    }

  }]);