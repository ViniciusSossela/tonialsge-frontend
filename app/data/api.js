
'use strict';

angular.module('myApp.API', [])
    .service('API', function () {

        var server = "http://localhost:8080/";

        this.loginURL = server + "usuario/login";

        this.clienteAddURL = server + "cliente/";
        this.clienteAllURL = server + "cliente/all";

        this.rotaAllUrl = server + "rota/all";
        this.rotaAddUrl = server + "rota/";

        this.tabelaPrecoAllUrl = server + "tabelapreco/all";
        this.tabelaPrecoAddUrl = server + "tabelapreco/";
        
    });