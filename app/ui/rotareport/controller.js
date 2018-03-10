'use strict';

angular.module('myApp.rotareport', ['ngRoute', 'ngStorage'])

    .config(['$routeProvider', '$stateProvider', function ($routeProvider, $stateProvider) {

        $stateProvider
            .state('report.rotareport', {
                cache: false,
                url: '/rotareport',
                views: {
                    'pageContentReport': {
                        templateUrl: 'ui/rotareport/view.html',
                        controller: 'RotaReportCtrl'
                    }
                }
            });

    }])

    .controller('RotaReportCtrl', ['$scope', '$http', '$localStorage', function ($scope, $http, $localStorage) {

        $scope.pedidoReport = []

        function groupBy(list, keyGetter) {
            const map = new Map();
            list.forEach((item) => {
                const key = keyGetter(item);
                const collection = map.get(key);
                if (!collection) {
                    map.set(key, [item]);
                } else {
                    collection.push(item);
                }
            });
            return map;
        }


        fetchReport();

        function getSum(total, num) {
            return total + Math.round(num);
        }

        function fetchReport() {
            var pedidosPorProduto = [];
            if ($localStorage.message == null) {
                location.reload();
                // alert('Tente abrir novamente');
            } else {
                var pedidos = JSON.parse($localStorage.message);
                const grouped = groupBy(pedidos, ped => ped.produto);


                grouped.forEach(function (valor, chave, mapa) {

                    var quantidadeTotalCalc = 0;
                    valor.forEach(function (item) {
                        quantidadeTotalCalc += parseFloat(item.quantidade);
                    });

                    pedidosPorProduto.push({
                        produto: chave,
                        quantidadeTotal: quantidadeTotalCalc
                    });
                });

                $scope.pedidoReport = 
                {
                    pedidos: pedidosPorProduto,
                    rota: pedidos[0].rota
                }
                $localStorage.$reset();
            }
        }

    }]);