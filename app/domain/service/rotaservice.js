
'use strict';

angular.module('myApp.RotaService', ['ngStorage'])
    .service('RotaService', function ($http, $sessionStorage) {

        this.cadastrarRota = function (rota, rotaCallback) {

            rotaCallback.onSuccess('success' + rota)
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
