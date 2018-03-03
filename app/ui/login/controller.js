'use strict';

angular.module('myApp.login', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'ui/login/view.html',
            controller: 'LoginCtrl'
        });
    }])

    .controller('LoginCtrl', ['$scope', '$http', '$location', 'hexafy', 'AuthService', function ($scope, $http, $location, hexafy, AuthService) {
        $('.view-content').removeClass('view-content')

        $scope.user = {
            username: "",
            password: ""
        };

        class LoginCallback {
            constructor() {
            }
        
            onSuccess(usuario) {  
                $location.path("/cliente");
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