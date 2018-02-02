'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.cliente',
  'myApp.produto',
  'myApp.rota',
  'myApp.tabelapreco',
  'myApp.pedido',
  'myApp.AuthService',
  'serviceUm',
  'myApp.version'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/cliente'});
}]).
run(['$rootScope', '$location', 'AuthService', function ($rootScope, $location, AuthService) {
  // Auth.init();
  AuthService.login();
   
  $rootScope.$on('$routeChangeStart', function (event, next) {
    // alert('routeChangeStart')
      if (!AuthService.isLoggedIn()){
          event.preventDefault();
          $location.path("/rota");
      }
  });
}]);
