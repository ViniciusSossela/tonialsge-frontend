'use strict';

angular.module('myApp.cliente', ['ngRoute', 'ui.router'])

  .config(['$routeProvider', '$stateProvider', function ($routeProvider, $stateProvider) {


    $stateProvider
      .state('tonial.cliente', {
        cache: false,
        url: '/cliente',
        views: {
          'pageContent': {
            templateUrl: 'ui/cliente/view.html',
            controller: 'ClienteCtrl'
          }
        }
      });
  }])

  .controller('ClienteCtrl',
    ['$scope', '$http', 'hexafy', 'ClienteService', 'RotaService', 'TabelaPrecoService', 'LoadingService',
      function ($scope, $http, hexafy, ClienteService, RotaService, TabelaPrecoService, LoadingService) {
        $scope.cliente = {
          nome: "",
          cpfcnpj: "",
          cidade: "",
          estado: "",
          endereco: "",
          email: "",
          rota: {},
          tabelaPreco: {},
          tabelaPrecoSelecionada: "",
          rotaSelecionada: "",
        }

        $scope.rotas = [];
        $scope.tabelasPreco = [];

        class ClienteCallback {
          constructor() {
          }

          onSuccess(cliente) {
            LoadingService.hideLoading();
            alert("Cliente cadastrado com sucesso");
          }
        }
        class RotaCallback {
          constructor() {
          }

          onSuccess(rotas) {
            $scope.rotas = rotas;
          }
        }
        class TabelaPrecoCallback {
          constructor() {
          }

          onSuccess(tabelas) {
            $scope.tabelasPreco = tabelas;
          }
        }

        loadRotas();
        loadTabelasPreco();

        function loadRotas() {
          RotaService.rotaAll(new RotaCallback());
        }

        function loadTabelasPreco() {
          TabelaPrecoService.tabelaPrecoAll(new TabelaPrecoCallback());
        }

        $scope.cadastrarCliente = function () {
          $scope.cliente.rota = {
            id: $scope.cliente.rotaSelecionada
          };
          $scope.cliente.tabelaPreco = {
            id: $scope.cliente.tabelaPrecoSelecionada
          };

          LoadingService.showLoading();

          ClienteService.cadastrarCliente($scope.cliente, new ClienteCallback());
        };

      }]);