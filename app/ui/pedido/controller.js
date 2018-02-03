'use strict';

angular.module('myApp.pedido', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/pedido', {
            templateUrl: 'ui/pedido/view.html',
            controller: 'PedidoCtrl'
        });
    }])

    .controller('PedidoCtrl', ['$scope', '$http', '$log', 'hexafy', function ($scope, $http, $log, hexafy) {

        $('#myModal').modal('show')

        $scope.rotas = []
        $scope.pedidos = []

        var produtosList = [
            {
                id: 0,
                name: "Rucula"
            },
            {
                id: 1,
                name: "Tomate"
            },
            {
                id: 2,
                name: "Alface"
            }];

        var clientesList = [
            {
                id: 0,
                name: "Cliente 0"
            },
            {
                id: 1,
                name: "Cliente 1"
            },
            {
                id: 2,
                name: "Cliente 2"
            }];

        $scope.tabNovaRotaClicked = function ($event) {
            $('#myModal').modal('show')
            $event.preventDefault()
        }

        $scope.choosenRota = function () {
            unactiveTabs()
            $scope.rotas.push({
                name: $('#rotaSelect').val(),
                produtos: produtosList,
                clientes: clientesList,
                quantidade: "",
                selectedProduto: "",
                selectedCliente: "",
                pedidos: []
            })
            // var clild = $scope.rotas.length - 1;
            // $('.nav-item a:nth(' + clild + ')').click();
            $('#myModal').modal('hide')
        }

        $scope.addProduto = function(rotaName) {

            var rotaInEdition = $scope.rotas.filter((rota) => rota.name === rotaName)[0]

            rotaInEdition.pedidos.push({
                cliente: rotaInEdition.selectedCliente,
                produto: rotaInEdition.selectedProduto,
                quantidade: rotaInEdition.quantidade
            });
            
        }

        $scope.tabClicked = function ($event) {
            $($event.target).tab('show')
            $event.preventDefault()
        }

        function unactiveTabs() {
            $('.nav-item a').removeClass('active').removeClass('show');
            $('.tab-content div').removeClass('active').removeClass('show');
        }

    }]);