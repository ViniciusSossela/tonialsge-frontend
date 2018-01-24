// (function () {
// angular.module('myApp.ServiceUm').service('serviceUm', ServiceUm);

// /* @ngInject */
// function ServiceUm($filter) {
//     return {
//     recuperarSenha,
//     alterarSenha,
//     };

//     function teste() {
//     return "TESTE";
//     }

// }
// }());


'use strict';

var app = angular.module('serviceUm', []);

app.service('hexafy', function() {
    this.myFunc = function () {
        return "TESTEEEE";
    }
});
  