
'use strict';

angular.module('myApp.RotaService', ['ngStorage'])
    .service('RotaService', ['$http', '$sessionStorage', 'API', function ($http, $sessionStorage, API) {

        this.rotaAll = function (rotaCallback) {
            $http.get(API.rotaAllUrl).
                then(
                    function (response) {
                        if (response.status == 200) {
                            rotaCallback.onSuccess(response.data)
                        } else {
                            alert('Não foi possível carregar as rotas')
                        }
                    },
                    function (response) {
                        alert('falha')
                    });
        }

        this.save = function (rota, rotaCallback) {
            $http.post(API.rotaAddUrl, rota)
                .then(
                    function (response) {
                        if (response.status == 200) {
                            rotaCallback.onSuccess(response.data)
                        } else {
                            alert('Não foi possível carregar a rota')
                        }
                    },
                    function (response) {
                        alert('falha')
                    });
        }
    }]);
