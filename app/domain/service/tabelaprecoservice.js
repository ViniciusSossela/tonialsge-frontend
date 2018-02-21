
'use strict';

angular.module('myApp.TabelaPrecoService', ['ngStorage'])
    .service('TabelaPrecoService', ['$http', 'API', function ($http, API) {

        this.tabelaPrecoAll = function (tabelaPrecoCallback) {
            $http.get(API.tabelaPrecoAllUrl)
                .then(
                    function (response) {
                        if (response.status == 200) {
                            tabelaPrecoCallback.onSuccess(response.data)
                        } else {
                            alert('Não foi possível carregar as tabelas de preço')
                        }
                    },
                    function (response) {
                        alert('falha')
                    });
        }

        this.save = function (tabelaPreco, tabelaPrecoCallback) {
            $http.post(API.tabelaPrecoAddUrl, tabelaPreco)
                .then(
                    function (response) {
                        if (response.status == 200) {
                            tabelaPrecoCallback.onSuccess(response.tabelaPreco)
                        } else {
                            alert('Não foi possível carregar a rota')
                        }
                    },
                    function (response) {
                        alert('falha')
                    });
        }
    }]);
