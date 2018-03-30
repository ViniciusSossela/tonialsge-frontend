'use strict';

angular.module('myApp.pedido', ['ngStorage', 'ngRoute', 'ui.router'])
    .config(['$routeProvider', '$stateProvider', function ($routeProvider, $stateProvider, $localStorage) {

        $stateProvider
            .state('tonial.pedido', {
                cache: false,
                url: '/pedido',
                views: {
                    'pageContent': {
                        templateUrl: 'ui/pedido/view.html',
                        controller: 'PedidoCtrl'
                    }
                }
            });
    }])

    .controller('PedidoCtrl', ['$scope', '$http', '$log', '$location', '$localStorage', 'ProdutoService',
        'ClienteService', 'RotaService', 'TabelaPrecoService', function ($scope, $http, $log, $location, $localStorage, ProdutoService, ClienteService, RotaService, TabelaPrecoService) {

            $('#myModal').modal('show')

            $scope.rotas = []
            $scope.rotasList = []
            $scope.pedidos = []
            var produtosList = [];
            var clientesList = [];

            $scope.novoCliente = {
                id: 0,
                nome: "",
                tabelaPrecoId: 0
            };

            $scope.novoProduto = {
                id: 0,
                nome: "",
                tabelasPreco: []
            };

            class ProdutoLoadCallback {
                constructor() {
                }

                onSuccess(produtos) {
                    produtosList = produtos;
                    var rotaInEdition = $scope.rotas.filter((rota) => rota.id === getRotaSelecionada())[0]
                    rotaInEdition.produtos = produtosList;
                }
            }

            function loadProdutos() {
                ProdutoService.findAll(new ProdutoLoadCallback());
            }


            class RotaCallback {
                constructor() {
                }

                onSuccess(rotas) {
                    $scope.rotasList = rotas;
                }
            }

            function loadRotas() {
                RotaService.rotaAll(new RotaCallback())
            }

            loadRotas();

            class TabelaPrecoCallback {
                constructor() {
                }

                onSuccess(tabelasPreco) {
                    $scope.novoProduto.tabelasPreco = tabelasPreco;
                }
            }

            class ClienteCallback {
                constructor() {
                }

                onSuccess(clientesByRota) {
                    // var rotaInEdition = $scope.rotas.filter((rota) => rota.id === clientesByRota[0].rota.id.toString())[0]
                    var rotaInEdition = getRotaSelecionadaToEdition()

                    rotaInEdition.clientes = clientesByRota;
                }
            }

            function loadClientesByRota(rotaId) {
                ClienteService.findAllByRota(rotaId, new ClienteCallback())
            }

            class TabelaPrecoProdutoCallback {
                constructor() {
                }

                onSuccess(tabelaPrecoProdutoList, tabelaPrecoClienteId) {
                    var rota = getRotaSelecionadaToEdition();

                    tabelaPrecoProdutoList.forEach(function (tabelaPrecoProduto) {
                        if (tabelaPrecoProduto.tabelaPrecoId == tabelaPrecoClienteId) {
                            rota.preco = tabelaPrecoProduto.preco;
                        }
                    });
                }
            }

            function loadTabelaPrecoProduto(produtoId, tabelaPrecoClienteId) {
                ProdutoService.findTabelaPreco(produtoId, tabelaPrecoClienteId, new TabelaPrecoProdutoCallback())
            }

            $scope.salvarTabelaPreco = function () {
                TabelaPrecoService.tabelaPrecoAll(new TabelaPrecoCallback())
            }

            $scope.tabNovaRotaClicked = function ($event) {
                $('#myModal').modal('show')
                $event.preventDefault()
            }

            $scope.updateSelectedProduto = function () {
                loadPrecoFromTabela();
            }

            $scope.updateSelectedCliente = function () {
                loadPrecoFromTabela();
            }

            function loadPrecoFromTabela() {
                var rota = getRotaSelecionadaToEdition();
                var tabelaPrecoClienteId = 0;
                rota.preco = 0;
                if (rota.selectedProduto != "" && rota.selectedCliente != "") {
                    angular.forEach(rota.clientes, function (cliente) {
                        if (cliente.id == rota.selectedCliente) {
                            rota.selectedClienteNome = cliente.nome;
                            tabelaPrecoClienteId = cliente.tabelaPreco.id;
                        }
                    });

                    if (tabelaPrecoClienteId != 0) {
                        angular.forEach(rota.produtos, function (produto) {
                            if (produto.id == rota.selectedProduto) {
                                rota.selectedProdutoNome = produto.nome;
                                loadTabelaPrecoProduto(produto.id, tabelaPrecoClienteId)
                            }
                        });
                    }
                }
            }

            function getRotaSelecionadaToEdition() {
                return $scope.rotas.filter((rota) => rota.id === getRotaSelecionada())[0];
            }

            $scope.choosenRota = function () {
                unactiveTabs()
                loadClientesByRota($('#rotaSelect').val());
                if (produtosList.length == 0) {
                    loadProdutos();
                }

                $scope.rotas.push({
                    id: $('#rotaSelect').val(),
                    nome: $("#rotaSelect option:selected").text(),
                    produtos: produtosList,
                    clientes: clientesList,
                    quantidade: "",
                    preco: "",
                    selectedProduto: "",
                    selectedCliente: "",
                    selectedProdutoNome: "",
                    selectedClienteNome: "",
                    pedidos: []
                })
                // var clild = $scope.rotas.length - 1;
                // $('.nav-item a:nth(' + clild + ')').click();
                $('#myModal').modal('hide')
            }

            $scope.addProduto = function (rotaId) {

                var rotaInEdition = $scope.rotas.filter((rota) => rota.id === rotaId)[0]

                rotaInEdition.pedidos.push({
                    rota: rotaInEdition.nome,
                    idCliente: rotaInEdition.selectedCliente,
                    idProduto: rotaInEdition.selectedProduto,
                    cliente: rotaInEdition.selectedCliente + "-" + rotaInEdition.selectedClienteNome,
                    produto: rotaInEdition.selectedProduto + "-" + rotaInEdition.selectedProdutoNome,
                    quantidade: rotaInEdition.quantidade,
                    precoTotal: (rotaInEdition.quantidade * rotaInEdition.preco).toFixed(2)
                });

            }

            $scope.novoClienteClicked = function () {
                $('#modalNovoCliente').modal('show')
            }

            $scope.novoProdutoClicked = function () {
                $('#modalNovoProduto').modal('show')
            }

            $scope.imprimirRota = function () {
                $localStorage.message = JSON.stringify(getRotaSelecionadaToEdition().pedidos);
                if ($localStorage.message != null) {
                    window.open('#!report/clientereport', '_blank');
                }
            }

            $scope.imprimirCarregamento = function () {
                $localStorage.message = JSON.stringify(getRotaSelecionadaToEdition().pedidos);
                if ($localStorage.message != null) {
                    window.open('#!report/rotareport', '_blank');
                }
            }

            $scope.tabClicked = function (id) {
                // $($event.target).tab('show')
                // $event.preventDefault()
                $('div.tab-pane').removeClass('active').removeClass('show')
                $('div.tab-pane[id="' + id + '"]').addClass('active').addClass('show')
            }

            $scope.saveNovoCliente = function () {
                var rotaInEdition = $scope.rotas.filter((rota) => rota.id === getRotaSelecionada())[0]
                rotaInEdition.clientes.push({
                    id: 0,
                    nome: $scope.novoCliente.nome
                })
            }

            function getRotaSelecionada() {
                return $('.tab-pane.active.show').attr('id');
            }

            $scope.saveNovoProduto = function () {
                var rotaSelected = $('.tab-pane.active.show').attr('id');
                var rotaInEdition = $scope.rotas.filter((rota) => rota.id === getRotaSelecionada())[0]
                rotaInEdition.produtos.push({
                    id: 0,
                    nome: $scope.novoProduto.nome
                })
            }

            function unactiveTabs() {
                $('.nav-item a').removeClass('active').removeClass('show');
                $('.tab-content div').removeClass('active').removeClass('show');
            }

        }]);