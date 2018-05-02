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

        // function getSum(total, num) {
        //     return total + Math.round(num);
        // }

        function fetchReport() {
            var pedidosPorCliente = [];
            if ($localStorage.message == null) {
                location.reload();
                // alert('Tente abrir novamente');
            } else {
                var pedidos = JSON.parse($localStorage.message);
                const grouped = groupBy(pedidos, ped => ped.cliente);


                grouped.forEach(function (valor, chave, mapa) {

                    var valorTotal = 0;
                    valor.forEach(function (item) {
                        valorTotal += parseFloat(item.precoTotal);
                    });

                    var today = new Date();
                    var dd = today.getDate();
                    var mm = today.getMonth()+1; //January is 0!

                    var yyyy = today.getFullYear();
                    if(dd<10){
                        dd='0'+dd;
                    } 
                    if(mm<10){
                        mm='0'+mm;
                    } 
                    var today = dd+'/'+mm+'/'+yyyy;

                    pedidosPorCliente.push({
                        cliente: chave,
                        produtos: valor,
                        totalPedidoCliente: valorTotal.toFixed(2),
                        data: today
                    });
                });

                $scope.pedidoReport = pedidosPorCliente;
                
                $localStorage.$reset();
            }
        }

    }]);