
'use strict';

angular.module('myApp.ProdutoService', ['ngStorage'])
    .service('ProdutoService', ['$http', 'API', function ($http, API) {

        this.cadastrarProduto = function (produto, produtoCallback) {
            $http.post(API.produtoAddURL, produto)
                .then(
                    function (response) {
                        if (response.status == 200) {
                            produtoCallback.onSuccess(response.data)
                        } else {
                            alert('produto inválido')
                        }
                    },
                    function (response) {
                        alert('falha')
                    });
        }
    }]);
