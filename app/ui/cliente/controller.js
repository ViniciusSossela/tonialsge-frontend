'use strict';

angular.module('myApp.cliente', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/cliente', {
      templateUrl: 'ui/cliente/view.html',
      controller: 'ClienteCtrl'
    });
  }])

  .controller('ClienteCtrl', ['$scope', '$http', 'hexafy', 'ClienteService', 'RotaService', 'TabelaPrecoService', function ($scope, $http, hexafy, ClienteService, RotaService, TabelaPrecoService) {
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
        alert(cliente);
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
      
      ClienteService.cadastrarCliente($scope.cliente, new ClienteCallback());
    };

  }]);