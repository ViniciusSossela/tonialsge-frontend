'use strict';

angular.module('myApp.cliente', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/cliente', {
      templateUrl: 'ui/cliente/view.html',
      controller: 'ClienteCtrl'
    });
  }])

  .controller('ClienteCtrl', ['$scope', '$http', 'hexafy', 'ClienteService', function ($scope, $http, hexafy, ClienteService) {
    $scope.cliente = {
      companyName: "",
      cidade: "",
      estado: "",
      endereco: "",
      email: "",
      rota: "",
      tabelaPreco: ""
    }


    class ClienteCallback {
      constructor() {
      }

      onSuccess(cliente) {
        alert(cliente);
      }
    }

    // $http.get('http://52.207.215.106:8080/greeting', $scope.cliente).
    //   then(function (response) {
    //     $scope.greeting = response.data;
    //     alert($scope.greeting);
    //   });

    $scope.cadastrarCliente = function () {
      ClienteService.cadastrarCliente($scope.cliente, new ClienteCallback());
    };

    //alert(hexafy.myFunc())

  }]);