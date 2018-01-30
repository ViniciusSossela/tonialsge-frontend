'use strict';

angular.module('myApp.pedido', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/pedido', {
            templateUrl: 'ui/pedido/view.html',
            controller: 'PedidoCtrl'
        });
    }])

    .controller('PedidoCtrl', ['$scope', '$http', '$log', 'hexafy', function ($scope, $http, $log, hexafy) {

        // Select first tab
        // $('.nav-tabs a:first').tab('show') 

        // $scope.tab1 = function(a) {
        //     $(a).tab('show');
        //     alert('clico');
        // };

        $(".nav-tabs a").click(function(){
            $(this).tab('show');
            return false;
        });

        // $(".nav-tabs a:second").click(function(){
        //     alert('clico');
        //     $(this).tab('show');
        // });
        


    }]);