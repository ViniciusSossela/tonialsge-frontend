'use strict';

angular.module('myApp.login', ['ngRoute', 'ui.router'])

    .config(['$routeProvider', '$stateProvider', function ($routeProvider, $stateProvider) {

        $stateProvider
            .state('authentication.login', {
                cache: false,
                url: '/login',
                views: {
                    'pageContentLogin': {
                        templateUrl: 'ui/login/view.html',
                        controller: 'LoginCtrl'
                    }
                }
            });

    }])

    .controller('LoginCtrl', ['$scope', '$http', '$location', '$state', 'AuthService', function ($scope, $http, $location, $state, AuthService) {
        $('.view-content').removeClass('view-content')

        $scope.user = {
            username: "",
            password: ""
        };

        class LoginCallback {
            constructor() {
            }

            onSuccess(usuario) {
                if (usuario != null && usuario != "") {
                    $state.go('tonial.cliente')
                } else {
                    alert('Usuário ou senha inválido.')
                }
                // $location.path("/cliente");
            }
        }
        // function to submit the form after all validation has occurred            
        $scope.submitForm = function (isValid) {

            // check to make sure the form is completely valid
            if (isValid) {
                AuthService.login($scope.user, new LoginCallback());

            }

        };

        // $scope.submitData = function (user) {
        //     alert('ok');
        // };


    }]);