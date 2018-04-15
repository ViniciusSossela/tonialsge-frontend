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
        'ClienteService', 'RotaService', 'TabelaPrecoService', 'LoadingService', function ($scope, $http, $log, $location, $localStorage, ProdutoService, ClienteService, RotaService, TabelaPrecoService, LoadingService) {

            $('#myModal').modal('show')

            $scope.pedidoIdentifier = 0
            $scope.rotas = []
            $scope.rotasList = []
            $scope.pedidos = []
            var produtosList = [];
            var clientesList = [];

            $scope.novoCliente = {
                id: 0,
                nome: "",
                tabelasPreco: [],
                tabelaPrecoSelecionada: 0
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
                    $scope.novoCliente.tabelasPreco = tabelasPreco;
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

            function loadAllTabelasPreco () {
                TabelaPrecoService.tabelaPrecoAll(new TabelaPrecoCallback())
            }
            loadAllTabelasPreco();

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

            $scope.excluirProdutoPedido = function(pedidoId) {
                var rotaInEdition = getRotaSelecionadaToEdition()
                rotaInEdition.pedidos.splice(pedidoId, 1)
            }

            $scope.addProduto = function (rotaId) {

                var rotaInEdition = $scope.rotas.filter((rota) => rota.id === rotaId)[0]

                rotaInEdition.pedidos.push({
                    id: $scope.pedidoIdentifier,
                    rota: rotaInEdition.nome,
                    idCliente: rotaInEdition.selectedCliente,
                    idProduto: rotaInEdition.selectedProduto,
                    cliente: rotaInEdition.selectedCliente + "-" + rotaInEdition.selectedClienteNome,
                    produto: rotaInEdition.selectedProduto + "-" + rotaInEdition.selectedProdutoNome,
                    quantidade: rotaInEdition.quantidade,
                    precoTotal: (rotaInEdition.quantidade * rotaInEdition.preco).toFixed(2)
                });

                $scope.pedidoIdentifier = $scope.pedidoIdentifier + 1;
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
                LoadingService.showLoading();

                var cliente = {
                    id: 0,
                    nome: $scope.novoCliente.nome,
                    rota: {
                        id : getRotaSelecionada()
                    },
                    tabelaPreco: {
                        id : $scope.novoCliente.tabelaPrecoSelecionada
                    },
                    cidade: $scope.novoCliente.cidade,
                    estado: $scope.novoCliente.estado
                }

                ClienteService.cadastrarCliente(cliente, new NovoClienteCallback());
            }

            class NovoClienteCallback {
                constructor() {
                }

                onSuccess(cliente) {
                    LoadingService.hideLoading();
                    var rotaInEdition = getRotaSelecionadaToEdition()
                    rotaInEdition.clientes.push(cliente);
                }
            }


            function getRotaSelecionada() {
                return $('.tab-pane.active.show').attr('id');
            }

            $scope.saveNovoProduto = function () {
                LoadingService.showLoading();
                var produto = {
                    id: 0,
                    nome: $scope.novoProduto.nome
                }
                ProdutoService.cadastrarProduto(produto, new NovoProdutoCallback());
            }

            class NovoProdutoCallback {
                constructor() {
                }

                onSuccess(produto) {
                    LoadingService.hideLoading();
                    var rotaInEdition = getRotaSelecionadaToEdition()
                    rotaInEdition.produtos.push({
                        id: produto.id,
                        nome: produto.nome
                    })
                }
            }

            function unactiveTabs() {
                $('.nav-item a').removeClass('active').removeClass('show');
                $('.tab-content div').removeClass('active').removeClass('show');
            }

        }]);