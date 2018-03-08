'use strict';

angular.module('myApp.clientereport', ['ngRoute', 'ngStorage'])

    .config(['$routeProvider', '$stateProvider', function ($routeProvider, $stateProvider) {

        $stateProvider
            .state('report.clientereport', {
                cache: false,
                url: '/clientereport',
                views: {
                    'pageContentReport': {
                        templateUrl: 'ui/clientereport/view.html',
                        controller: 'ClienteReportCtrl'
                    }
                }
            });

    }])

    .controller('ClienteReportCtrl', ['$scope', '$http', '$localStorage', function ($scope, $http, $localStorage) {

        $scope.pedidoReport = []

        Array.prototype.groupBy = function (prop) {
            return this.reduce(function (groups, item) {
                const val = item[prop]
                groups[val] = groups[val] || []
                groups[val].push(item)
                return groups
            }, {})
        }


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

        function fetchReport() {
            var pedidosPorCliente = [];
            var pedidos = JSON.parse($localStorage.message);
            const grouped = groupBy(pedidos, ped => ped.cliente);

            grouped.forEach(function(valor, chave, mapa) { 

                pedidosPorCliente.push({
                    cliente: chave,
                    produtos: valor
                });
                // alert(valor + " - " + chave)
            });


            const groupedByTime = pedidos.groupBy('cliente')
            $scope.pedidoReport = pedidosPorCliente;
        }

    }]);