
'use strict';

angular.module('myApp.ClienteService', ['ngStorage'])
    .service('ClienteService', ['$http', '$sessionStorage', 'API', function ($http, $sessionStorage, API) {

        this.cadastrarCliente = function (cliente, clienteCallback) {

            $http.post(API.clienteAddURL, cliente)
                .then(
                    function (response) {
                        if (response.status == 200) {
                            clienteCallback.onSuccess(response.data)
                        } else {
                            alert('cliente inválido')
                        }
                    },
                    function (response) {
                        alert('falha')
                    });
        }
    }]);
