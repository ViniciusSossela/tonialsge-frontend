
'use strict';

angular.module('myApp.LoadingService', [])
    .service('LoadingService', [function () {

        this.showLoading = function () {
            $('#loading').show();
        }
        this.hideLoading = function () {
            $('#loading').hide();
        }

    }]);
