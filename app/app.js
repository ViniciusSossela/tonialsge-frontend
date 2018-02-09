'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.cliente',
  'myApp.produto',
  'myApp.rota',
  'myApp.login',
  'myApp.tabelapreco',
  'myApp.pedido',
  'myApp.AuthService',
  'serviceUm',
  'myApp.version'
]).
  config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider.otherwise({ redirectTo: '/login' });
  }]).
  run(['$rootScope', '$location', 'AuthService', function ($rootScope, $location, AuthService) {

    $rootScope.$on('$routeChangeStart', function (event, next) {
      // alert('routeChangeStart')
      if (!AuthService.isLoggedIn()) {
        // alert('sem usuario logado')
        // event.preventDefault();
        $location.path("/login");
      } else {
        $('#ng-view').addClass('view-content')
        $('#side-menu').show()
        $('#toolbar').show()
      }
    });
  }]);
