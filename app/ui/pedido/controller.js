'use strict';

angular.module('myApp.pedido', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/pedido', {
            templateUrl: 'ui/pedido/view.html',
            controller: 'PedidoCtrl'
        });
    }])

    .controller('PedidoCtrl', ['$scope', '$http', '$log', '$location', 'hexafy', function ($scope, $http, $log, $location, hexafy) {

        $('#myModal').modal('show')

        $scope.rotas = []
        $scope.pedidos = []

        $scope.novoCliente = {
            id: 0,
            nome: "",
            tabelaPrecoId: 0
        };

        $scope.novoProduto = {
            id: 0,
            nome: "",
            tabelasPreco: [
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
        };

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
                preco: "",
                selectedProduto: "",
                selectedCliente: "",
                pedidos: []
            })
            // var clild = $scope.rotas.length - 1;
            // $('.nav-item a:nth(' + clild + ')').click();
            $('#myModal').modal('hide')
        }

        $scope.addProduto = function (rotaName) {

            var rotaInEdition = $scope.rotas.filter((rota) => rota.name === rotaName)[0]

            rotaInEdition.pedidos.push({
                cliente: rotaInEdition.selectedCliente,
                produto: rotaInEdition.selectedProduto,
                quantidade: rotaInEdition.quantidade,
                precoTotal: rotaInEdition.quantidade * rotaInEdition.preco
            });

        }

        $scope.novoClienteClicked = function () {
            $('#modalNovoCliente').modal('show')
        }

        $scope.novoProdutoClicked = function () {
            $('#modalNovoProduto').modal('show')
        }

        $scope.imprimirRota = function () {
            $location.path("/login");
        }

        $scope.tabClicked = function ($event) {
            $($event.target).tab('show')
            $event.preventDefault()
        }

        $scope.saveNovoCliente = function() {
            var rotaInEdition = $scope.rotas.filter((rota) => rota.name === getRotaSelecionada())[0]
            rotaInEdition.clientes.push({
                id: 0,
                name: $scope.novoCliente.nome
            })
        }

        function getRotaSelecionada() {
            return $('.tab-pane.active.show').attr('id');
        }

        $scope.saveNovoProduto = function() {
            var rotaSelected = $('.tab-pane.active.show').attr('id');
            var rotaInEdition = $scope.rotas.filter((rota) => rota.name === getRotaSelecionada())[0]
            rotaInEdition.produtos.push({
                id: 0,
                name: $scope.novoProduto.nome
            })
        }

        function unactiveTabs() {
            $('.nav-item a').removeClass('active').removeClass('show');
            $('.tab-content div').removeClass('active').removeClass('show');
        }

    }]);