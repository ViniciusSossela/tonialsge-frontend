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

  .controller('ProdutoCtrl', ['$scope', 'ProdutoService', 'TabelaPrecoService', 'LoadingService',
    function ($scope, ProdutoService, TabelaPrecoService, LoadingService) {

      $scope.tabelasPreco = []
      $scope.produto = {
        produtoId: 0,
        nome: "",
        tabelaPrecoProduto: [],
        selectedProduto: "",
        produtos: []
      }

      class ProdutoCallback {
        constructor() {
        }

        onSuccess(produto) {
          LoadingService.hideLoading();
          $scope.produto.tabelaPrecoProduto = [];
          alert("Produto salvo com sucesso.");
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

      class ProdutoLoadCallback {
        constructor() {
        }

        onSuccess(produtosList) {

          produtosList.sort(function (a, b) {
            var nameA = a.nome.toLowerCase(), nameB = b.nome.toLowerCase();
            if (nameA < nameB) //sort string ascending
                return -1;
            if (nameA > nameB)
                return 1;
            return 0; //default return value (no sorting)
        });


          $scope.produto.produtos = produtosList
        }
      }

      function loadProdutos() {
        ProdutoService.findAll(new ProdutoLoadCallback());
      }


      class TabelaPrecoProdutoCallback {
        constructor() {
        }

        onSuccess(tabelaPrecoProdutoList, tabelaPrecoClienteId) {

          LoadingService.hideLoading();
          if (tabelaPrecoProdutoList.length > 0) {
            tabelaPrecoProdutoList.forEach(function (tabelaPrecoProduto) {

              $scope.tabelasPreco.forEach(function (tabelaPreco) {
                if (tabelaPrecoProduto.tabelaPrecoId == tabelaPreco.id) {
                  tabelaPreco.preco = tabelaPrecoProduto.preco;
                }
              });
            });
          } else {
            $scope.tabelasPreco.forEach(function (tabelaPreco) {
              tabelaPreco.preco = 0
            });
          }
        }
      }

      function loadTabelaPrecoProduto(produtoId) {
        LoadingService.showLoading();
        if (produtoId != 0) {
          ProdutoService.findTabelaPreco(produtoId, 0, new TabelaPrecoProdutoCallback())
        } else {
          LoadingService.hideLoading();
          $scope.tabelasPreco.forEach(function (tabelaPreco) {
            tabelaPreco.preco = 0
          });
        }
      }


      loadTabelasPreco();
      loadProdutos();


      $scope.selectedProduto = function () {
        loadTabelaPrecoProduto($scope.produto.selectedProduto)
      }

      function loadTabelasPreco() {
        TabelaPrecoService.tabelaPrecoAll(new TabelaPrecoCallback());
      }

      $scope.salvarProduto = function () {

        if ($scope.produto.nome == "" && $scope.produto.selectedProduto == "") {
          alert('Informe o nome do novo produto ou selecione um produto para edita-lo')
        } else {

          if ($scope.produto.nome != "") {
            $scope.produto.produtoId = 0
          } else {
            if ($scope.produto.selectedProduto != "") {
              $scope.produto.produtoId = $scope.produto.selectedProduto
            }
          }
          angular.forEach($scope.tabelasPreco, function (tabelaPrecoVM, key) {
            $scope.produto.tabelaPrecoProduto.push({
              preco: tabelaPrecoVM.preco,
              tabelaPreco: {
                id: tabelaPrecoVM.id
              }
            })
          });
          LoadingService.showLoading();
          ProdutoService.cadastrarProduto($scope.produto, new ProdutoCallback())
        }
      }

    }]);