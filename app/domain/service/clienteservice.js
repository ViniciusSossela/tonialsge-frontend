
'use strict';

angular.module('myApp.ClienteService', ['ngStorage'])
    .service('ClienteService', function ($http, $sessionStorage) {

        this.cadastrarCliente = function (cliente, clienteCallback) {

            clienteCallback.onSuccess('success')
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
