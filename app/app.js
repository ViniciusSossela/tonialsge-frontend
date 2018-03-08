'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ui.router',
  'myApp.cliente',
  'myApp.produto',
  'myApp.rota',
  'myApp.login',
  'myApp.tabelapreco',
  'myApp.pedido',
  'myApp.clientereport',
  'myApp.API',
  'myApp.AuthService',
  'myApp.ClienteService',
  'myApp.ProdutoService',
  'myApp.RotaService',
  'myApp.TabelaPrecoService',
  'serviceUm',
  'myApp.version'
]).
  config(['$locationProvider', '$routeProvider', '$stateProvider', function ($locationProvider, $routeProvider, $stateProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider.otherwise({ redirectTo: 'authentication/login' });

    $stateProvider
      .state('tonial', {
        url: '/tonial',
        abstract: true,
        templateUrl: 'ui/root.html',
      })
      .state('authentication', {
        url: '/authentication',
        abstract: true,
        templateUrl: 'ui/login/authentication.html',
        // controller: 'LoginCtrl as menu'
      });

  }]).
  run(['$rootScope', '$location', '$state', '$transitions', 'AuthService', function ($rootScope, $location, $state, $transitions, AuthService) {

    $transitions.onSuccess({}, trans => {
      if (!AuthService.isLoggedIn()) {
        $state.go('authentication.login')
      }
    });

  }]);
