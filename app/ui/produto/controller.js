'use strict';

angular.module('myApp.produto', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/produto', {
    templateUrl: 'ui/produto/view.html',
    controller: 'ProdutoCtrl'
  });
}])

.controller('ProdutoCtrl', [function() {

}]);