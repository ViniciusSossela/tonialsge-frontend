
'use strict';

angular.module('myApp.ProdutoService', ['ngStorage'])
    .service('ProdutoService', function ($http, $sessionStorage) {

        this.cadastrarProduto = function (produto, produtoCallback) {

            produtoCallback.onSuccess('success' + produto)
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
