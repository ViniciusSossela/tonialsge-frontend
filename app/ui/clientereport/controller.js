'use strict';

angular.module('myApp.clientereport', ['ngRoute'])

    .config(['$routeProvider', '$stateProvider', function ($routeProvider, $stateProvider) {

        $stateProvider
            .state('authentication.clientereport', {
                cache: false,
                url: '/clientereport',
                views: {
                    'pageContentLogin': {
                        templateUrl: 'ui/clientereport/view.html',
                        controller: 'ClienteReportCtrl'
                    }
                }
            });

    }])

    .controller('ClienteReportCtrl', ['$scope', '$http', function ($scope, $http) {

        $scope.rota = {
            nome: "",
            descricao: ""
        }


    }]);