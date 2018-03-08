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
  config(['$locationProvider', '$routeProvider', '$stateProvider', '$urlRouterProvider', function ($locationProvider, $routeProvider, $stateProvider, $urlRouterProvider) {
    $locationProvider.hashPrefix('!');
    $urlRouterProvider.otherwise('/authentication/login');
    $stateProvider.state("otherwise", { url: '/authentication/login' })

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
      })
      .state('report', {
        url: '/report',
        abstract: true,
        templateUrl: 'ui/root-report.html',
      });
  }]).
  run(['$rootScope', '$location', '$state', '$transitions', 'AuthService', function ($rootScope, $location, $state, $transitions, AuthService) {

    $transitions.onSuccess({}, trans => {

      if (trans.to().name != "report.clientereport") {
        if (!AuthService.isLoggedIn()) {
          $state.go('authentication.login')
        }
      }
    });

  }]);
