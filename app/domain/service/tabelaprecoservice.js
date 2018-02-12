
'use strict';

angular.module('myApp.TabelaPrecoService', ['ngStorage'])
    .service('TabelaPrecoService', function ($http, $sessionStorage) {

        this.cadastrarTabelaPreco = function (tabelaPreco, tabelaPrecoCallback) {

            tabelaPrecoCallback.onSuccess('success' + tabelaPreco)
            // $http.post('http://localhost:8080/cliente/', usuario).
            //     then(
            //     function (response) {
            //         if (response.status == 200) {
            //             $sessionStorage.user = response.data
            //             loginCallback.onSuccess(response.data)
            //         } else {
            //             alert('usuario inválido')
            //         }
            //     },
            //     function (response) {
            //         alert('falha')
            //     });
        }
    });
